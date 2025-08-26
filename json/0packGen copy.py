import sys
import os
import json
import random
import string
from datetime import datetime
from PyQt5.QtWidgets import (
    QApplication, QWidget, QFormLayout, QLabel, QLineEdit, 
    QPushButton, QMessageBox, QScrollArea, QVBoxLayout, QTabWidget
)

# --------------------------
# Funciones auxiliares
# --------------------------
def random_serial(length=12):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def random_batch():
    year = datetime.now().year
    return f"Lote-{year}{random.randint(100,999)}"

def random_date():
    year = random.randint(2020, datetime.now().year)
    month = random.randint(1, 12)
    return f"{month:02d}-{year}"

def random_cell_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

# --------------------------
# Clase para un formulario por pestaña
# --------------------------
class BatteryForm(QWidget):
    def __init__(self, template_path, output_dir):
        super().__init__()
        self.template_path = template_path
        self.output_dir = output_dir

        self.main_layout = QVBoxLayout()
        self.scroll = QScrollArea()
        self.form_widget = QWidget()
        self.layout = QFormLayout(self.form_widget)

        self.scroll.setWidgetResizable(True)
        self.scroll.setWidget(self.form_widget)
        self.main_layout.addWidget(self.scroll)
        self.setLayout(self.main_layout)

        self.load_template()

        self.save_button = QPushButton("Guardar JSON y refrescar")
        self.save_button.clicked.connect(self.save_json)
        self.main_layout.addWidget(self.save_button)

    def load_template(self):
        with open(self.template_path, "r", encoding="utf-8") as f:
            self.data = json.load(f)

        self.inputs = {}
        while self.layout.count():
            child = self.layout.takeAt(0)
            if child.widget():
                child.widget().deleteLater()

        self.build_form(self.data)

    def build_form(self, d, parent_key=""):
        if isinstance(d, dict):
            for k, v in d.items():
                key = f"{parent_key}.{k}" if parent_key else k
                if isinstance(v, dict):
                    self.build_form(v, key)
                elif isinstance(v, list):
                    for i, item in enumerate(v):
                        # lista de campos 0 → generar ID de pack
                        if item == "0":
                            value = f"BP{random.randint(1000,9999)}"
                            line_edit = QLineEdit(value)
                            self.inputs[f"{key}[{i}]"] = line_edit
                            self.layout.addRow(QLabel(f"{key}[{i}]"), line_edit)
                            d[k][i] = value
                        else:
                            self.build_form(item, f"{key}[{i}]")
                else:
                    if v == "0":
                        if "serial" in k.lower() or "uuid" in k.lower():
                            value = random_serial()
                        elif "passport" in k.lower():
                            value = random_serial(14)
                        else:
                            value = random_serial(6)
                        line_edit = QLineEdit(value)
                        self.inputs[key] = line_edit
                        self.layout.addRow(QLabel(key), line_edit)
                        d[k] = value

    def set_value(self, d, keys, value):
        if not keys:
            return  # lista vacía, nada que hacer

        key = keys[0]

        if "[" in key and "]" in key:
            # extraer índice
            k, idx = key.split("[")
            idx = int(idx[:-1])
            if len(keys) == 1:
                d[k][idx] = value
            else:
                self.set_value(d[k][idx], keys[1:], value)
        else:
            if len(keys) == 1:
                d[key] = value
            else:
                self.set_value(d[key], keys[1:], value)

    def save_json(self):
        # actualizar valores desde inputs
        for key, widget in self.inputs.items():
            value = widget.text()
            self.set_value(self.data, key.split("."), value)

        # detectar clave raíz dinámica
        root_key = list(self.data.keys())[0]

        # elegir serial/uuid como nombre de archivo
        if "uuid" in self.data[root_key]:
            serial = self.data[root_key]["uuid"]
        elif "id_product_data" in self.data[root_key]:
            serial = self.data[root_key]["id_product_data"]["serial"]
        else:
            serial = random_serial()

        # renombrar la raíz con el serial para salida
        self.data = {serial: self.data[root_key]}

        # crear carpeta de salida
        os.makedirs(self.output_dir, exist_ok=True)
        file_name = os.path.join(self.output_dir, f"{serial}.json")
        with open(file_name, "w", encoding="utf-8") as f:
            json.dump(self.data, f, indent=2, ensure_ascii=False)

        QMessageBox.information(self, "Éxito", f"Archivo guardado como {file_name}")
        self.load_template()


# --------------------------
# Ventana principal con pestañas
# --------------------------
class BatteryEditor(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Battery Pack Editor")
        self.resize(800, 600)

        layout = QVBoxLayout()
        self.setLayout(layout)

        self.tabs = QTabWidget()
        layout.addWidget(self.tabs)

        script_dir = os.path.dirname(os.path.abspath(__file__))
        templates_dir = os.path.join(script_dir, "templates")

        # Rutas de templates
        template1 = os.path.join(templates_dir, "bess_template.json")
        template2 = os.path.join(templates_dir, "bp_template.json")
        template3 = os.path.join(templates_dir, "cell_template.json")  # Nueva pestaña

        # rutas de salida
        output1 = os.path.join(script_dir, "bess")
        output2 = os.path.join(script_dir, "bp")
        output3 = os.path.join(script_dir, "cell")  # Carpeta de salida para cell

        # crear las pestañas
        self.tab1 = BatteryForm(template1, output1)
        self.tab2 = BatteryForm(template2, output2)
        self.tab3 = BatteryForm(template3, output3)  # Nueva pestaña

        # añadirlas al TabWidget
        self.tabs.addTab(self.tab1, "Tipo BESS")
        self.tabs.addTab(self.tab2, "Tipo BP")
        self.tabs.addTab(self.tab3, "Tipo CELL")  # Nueva pestaña

# --------------------------
# MAIN
# --------------------------
if __name__ == "__main__":
    app = QApplication(sys.argv)
    editor = BatteryEditor()
    editor.show()
    sys.exit(app.exec_())
