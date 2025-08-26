import sys
import json
import random
import string
from datetime import datetime
from PyQt5.QtWidgets import (
    QApplication, QWidget, QFormLayout, QLabel, QLineEdit, 
    QPushButton, QMessageBox, QScrollArea, QVBoxLayout
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
# Clase principal PyQt
# --------------------------
class BatteryEditor(QWidget):
    def __init__(self, template_path=""):
        super().__init__()
        self.setWindowTitle("Battery Pack Editor")

        # Scroll + layout para que soporte muchos campos
        self.main_layout = QVBoxLayout()
        self.scroll = QScrollArea()
        self.form_widget = QWidget()
        self.layout = QFormLayout(self.form_widget)

        self.scroll.setWidgetResizable(True)
        self.scroll.setWidget(self.form_widget)
        self.main_layout.addWidget(self.scroll)

        self.setLayout(self.main_layout)

        self.template_path = template_path
        self.load_template()

        # Botón guardar
        self.save_button = QPushButton("Guardar JSON y refrescar")
        self.save_button.clicked.connect(self.save_json)
        self.main_layout.addWidget(self.save_button)

    def load_template(self):
        """Carga la plantilla y construye el formulario"""
        with open(self.template_path, "r", encoding="utf-8") as f:
            self.data = json.load(f)

        self.inputs = {}
        # limpiar layout previo (por si refrescamos)
        while self.layout.count():
            child = self.layout.takeAt(0)
            if child.widget():
                child.widget().deleteLater()

        self.build_form(self.data)

    def build_form(self, d, parent_key=""):
        """Recorre el JSON y genera inputs para los valores == '0'"""
        if isinstance(d, dict):
            for k, v in d.items():
                key = f"{parent_key}.{k}" if parent_key else k
                if isinstance(v, dict):
                    self.build_form(v, key)
                elif isinstance(v, list):
                    for i, item in enumerate(v):
                        self.build_form(item, f"{key}[{i}]")
                else:
                    if v == "0":
                        # Generar valor random lógico
                        if "serial" in k.lower():
                            value = random_serial()
                        elif "passport" in k.lower():
                            value = random_serial(14)
                        elif "batch" in k.lower():
                            value = random_batch()
                        elif "date" in k.lower():
                            value = random_date()
                        elif "cell" in parent_key.lower():
                            value = random_cell_id()
                        else:
                            value = random_serial(6)

                        # Crear campo editable
                        line_edit = QLineEdit(value)
                        self.inputs[key] = line_edit
                        self.layout.addRow(QLabel(key), line_edit)

                        # Actualizar valor en data
                        self.set_value(self.data, key.split("."), value)

        elif isinstance(d, list):
            for i, item in enumerate(d):
                self.build_form(item, f"{parent_key}[{i}]")

    def set_value(self, d, keys, value):
        """Inserta un valor en self.data dado un path de claves"""
        key = keys[0]
        if "[" in key and "]" in key:
            k, idx = key.split("[")
            idx = int(idx[:-1])
            self.set_value(d[k][idx], keys[1:], value)
        elif len(keys) == 1:
            d[key] = value
        else:
            self.set_value(d[key], keys[1:], value)

    def save_json(self):
        # Recolectar valores actualizados
        for key, widget in self.inputs.items():
            value = widget.text()
            self.set_value(self.data, key.split("."), value)

        # Obtener serial
        serial = self.data["BATTERY_PACK_TEMPLATE"]["id_product_data"]["serial"]

        # Renombrar BATTERY_PACK_TEMPLATE por el serial
        self.data = {serial: self.data["BATTERY_PACK_TEMPLATE"]}
        self.data[serial]["id_product_data"]["serial"] = serial

        # Guardar archivo con nombre del serial
        file_name = f"json/{serial}.json"
        with open(file_name, "w", encoding="utf-8") as f:
            json.dump(self.data, f, indent=2, ensure_ascii=False)

        QMessageBox.information(self, "Éxito", f"Archivo guardado como {file_name}")

        # Volver a cargar plantilla y refrescar valores random
        self.load_template()


# --------------------------
# MAIN
# --------------------------
if __name__ == "__main__":
    app = QApplication(sys.argv)
    editor = BatteryEditor("json/templates/bp_template.json")
    editor.resize(800, 600)
    editor.show()
    sys.exit(app.exec_())
