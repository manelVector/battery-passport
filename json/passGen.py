import sys 
import os
import json
import random
import string
from datetime import datetime
from PyQt5.QtWidgets import (
    QApplication, QWidget, QFormLayout, QLabel, QLineEdit,
    QPushButton, QMessageBox, QScrollArea, QVBoxLayout, QTabWidget, QGroupBox, QComboBox
)

def random_serial(length=12):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

class add_tab(QWidget):
    def __init__(self, template_path, output_dir, cell_dir=None, bp_dir=None):
        super().__init__()
        self.template_path = template_path
        self.output_dir = output_dir
        self.cell_dir = cell_dir   # carpeta donde están los .json de las celdas
        self.bp_dir = bp_dir
        self.serial = None
        self.main_layout = QVBoxLayout()
        self.scroll = QScrollArea()
        self.form_widget = QWidget()
        self.layout = QVBoxLayout(self.form_widget)

        self.scroll.setWidgetResizable(True)
        self.scroll.setWidget(self.form_widget)
        self.main_layout.addWidget(self.scroll)
        self.setLayout(self.main_layout)

        self.inputs = {}
        self.load_template()

        self.save_button = QPushButton("Guardar JSON y refrescar")
        self.save_button.clicked.connect(self.save_json)
        self.main_layout.addWidget(self.save_button)

    def list_files(self, dir = None):
        """Devuelve lista de archivos JSON en el directorio de celdas"""
        if not dir or not os.path.exists(dir):
            return []
        return [os.path.splitext(f)[0] for f in os.listdir(dir) if f.endswith(".json")]

    def create_fields(self, data, parent_layout=None, prefix=""):
        if parent_layout is None:
            parent_layout = self.layout

        if isinstance(data, dict):
            group = QGroupBox(prefix if prefix else "Root")
            group_layout = QFormLayout()
            group.setLayout(group_layout)
            parent_layout.addWidget(group)

            for key, value in data.items():
                new_prefix = f"{prefix}.{key}" if prefix else key
                self.create_fields(value, group_layout, new_prefix)

        elif isinstance(data, list):
            group = QGroupBox(prefix)
            group_layout = QFormLayout()
            group.setLayout(group_layout)
            parent_layout.addWidget(group)

            for idx, value in enumerate(data):
                new_prefix = f"{prefix}[{idx}]"
                self.create_fields(value, group_layout, new_prefix)

        else:
            # --- CASO ESPECIAL: desplegable para cell_info.cells_id ---
            if prefix.startswith("cell_info.cells_id."):
                combo = QComboBox()
                files = self.list_files(self.cell_dir)
                combo.addItems(files if files else ["<no cells found>"])
                if str(data) in files:
                    combo.setCurrentText(str(data))
                parent_layout.addRow(QLabel(prefix.split(".")[-1]), combo)
                self.inputs[prefix] = combo

            elif prefix.startswith("batpacks"):
                combo = QComboBox()
                files = self.list_files(self.bp_dir)
                combo.addItems(files if files else ["<no cells found>"])
                if str(data) in files:
                    combo.setCurrentText(str(data))
                parent_layout.addRow(QLabel(prefix.split(".")[-1]), combo)
                self.inputs[prefix] = combo
            else:
                if str(data).strip().lower() == "app":
                    default_value = ""
                elif prefix.endswith("serial"):
                    default_value = self.serial
                else:
                    default_value = str(data)

                line_edit = QLineEdit(default_value)
                parent_layout.addRow(QLabel(prefix.split(".")[-1]), line_edit)
                self.inputs[prefix] = line_edit

    def rebuild_json(self, data, prefix=""):
        if isinstance(data, dict):
            return {
                key: self.rebuild_json(value, f"{prefix}.{key}" if prefix else key)
                for key, value in data.items()
            }
        elif isinstance(data, list):
            return [
                self.rebuild_json(value, f"{prefix}[{idx}]")
                for idx, value in enumerate(data)
            ]
        else:
            widget = self.inputs.get(prefix)
            if isinstance(widget, QComboBox):
                return widget.currentText()
            elif widget:
                return widget.text()
            return str(data)

    def load_template(self):
        try:
            with open(self.template_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            QMessageBox.critical(self, "Error", f"No se pudo cargar la plantilla:\n{e}")
            return
        self.create_fields(data)

    def save_json(self):
        try:
            with open(self.template_path, "r", encoding="utf-8") as f:
                template_data = json.load(f)

            new_data = self.rebuild_json(template_data)

            # Obtener el valor actual del campo "serial"
            for key, widget in self.inputs.items():
                if key.endswith("serial") and isinstance(widget, QLineEdit):
                    self.serial = widget.text().strip()
                    break

            # Si no hay serial, genera uno nuevo por seguridad
            if not self.serial:
                self.serial = random_serial()

            filename = f"{self.serial}.json"
            filepath = os.path.join(self.output_dir, filename)

            os.makedirs(self.output_dir, exist_ok=True)
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(new_data, f, indent=4, ensure_ascii=False)

            QMessageBox.information(self, "Éxito", f"Archivo guardado en:\n{filepath}")

        except Exception as e:
            QMessageBox.critical(self, "Error", f"No se pudo guardar:\n{e}")


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
        template_cell = os.path.join(templates_dir, "cell_template.json")
        template_bp   = os.path.join(templates_dir, "bp_template.json")
        template_bess = os.path.join(templates_dir, "bess_template.json")

        # rutas de salida
        cell_output_dir = os.path.join(script_dir, "cell")
        bp_output_dir   = os.path.join(script_dir, "bp")
        bess_output_dir   = os.path.join(script_dir, "bess")

        # crear las pestañas (ahora dos)
        self.tab_cell = add_tab(template_cell, cell_output_dir)
        self.tab_bp   = add_tab(template_bp, bp_output_dir, cell_dir= cell_output_dir)
        self.tab_bess   = add_tab(template_bess, bess_output_dir, bp_dir= bp_output_dir)

        # añadirlas al TabWidget
        self.tabs.addTab(self.tab_cell, "CELL")
        self.tabs.addTab(self.tab_bp, "BP")
        self.tabs.addTab(self.tab_bess, "BESS")


# --------------------------
# MAIN
# --------------------------
if __name__ == "__main__":
    app = QApplication(sys.argv)
    editor = BatteryEditor()
    editor.show()
    sys.exit(app.exec_())
