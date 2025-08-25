import sys
import json
import uuid
from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QPushButton,
    QLabel, QLineEdit, QScrollArea, QFormLayout, QMessageBox, QTabWidget
)

PACKS_FILE = "bp_data.json"
CELLS_FILE = "cells_data.json"
BESS_FILE = "bess_data.json"

# Plantilla de un nuevo PACK
def pack_template():
    return {
        "uuid": str(uuid.uuid4()),
        "passport_uuid": str(uuid.uuid4()),
        "description": "Standard 18650 cell battery pack",
        "general_information": {
            "manufacturing_info": "Assembled in Spain, 2024",
            "battery_category": "Rechargeable Lithium-Ion",
            "battery_weight": "12.5 kg",
            "battery_status": "Operational"
        },
        "labels_certifications": {
            "symbols_labels": ["CE", "WEEE", "UN38.3"],
            "meaning": "CE: European Conformity, WEEE: Waste Electrical & Electronic Equipment, UN38.3: Transport Safety",
            "declaration_conformity": "Issued by VTech Labs, 2024",
            "test_compliance": "Passed IEC 62619, IEC 61960"
        },
        "carbon_footprint": {
            "carbon_footprint": "45 kg CO₂eq",
            "weblink": "https://example.com/carbon-study",
            "performance_class": "Class B"
        },
        "supply_chain": {
            "due_diligence_report": "Available at supplier portal"
        },
        "materials_composition": {
            "hazardous_substances": "Contains LiPF6, Nickel, Cobalt",
            "battery_chemistry": "NMC (Nickel Manganese Cobalt Oxide)",
            "critical_raw_materials": ["Cobalt", "Lithium", "Nickel"],
            "materials_detailed": {
                "cathode": "NMC622",
                "anode": "Graphite",
                "electrolyte": "LiPF6 in EC/DMC"
            }
        },
        "circularity_resource_efficiency": {
            "recycled_content": "15%",
            "manuals_disassembly": "Available at https://example.com/manuals",
            "spare_parts": "Connector PN-3342, Fuse PN-8891",
            "safety_measures": "Use insulated tools, avoid water exposure"
        },
        "performance_durability": {
            "capacity_energy_power_soh": "220 Ah, 11.1 V, 500 W, SOH: 95%",
            "expected_lifetime": "10 years / 3000 cycles",
            "negative_events": "No critical failures reported"
        },
        "cells": [f"CELL_{i:06d}" for i in range(1, 21)]
    }

# Plantilla de una nueva CELL
def cell_template():
    return {
        "GeneralInfo": {
            "manufacturer": "LYTH",
            "manufacture_date": "2024-06-15",
            "carbon_footprint": "",
            "model": "L173F220A",
            "capacity": "220 Ah",
            "voltage": "3.7 V"
        },
        "EolTest": {
            "EOLvoltage": "3.7 V",
            "EOLcurrent": "246,28 A",
            "EOLresistance": "0,228 Ω"
        }
    }

# Plantilla de un nuevo BESS
def bess_template():
    return {
        "description": "Laboratory prototype BESS system",
        "batpacks": [f"PACK_{i:06d}" for i in range(1, 15)],
        "location": "Bcn, Spain",
        "power": "500 kW",
        "energy": "1 MWh",
        "uuid": str(uuid.uuid4()),
        "passport_uuid": str(uuid.uuid4())
    }

class PackTab(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout(self)

        self.add_btn = QPushButton("➕ Añadir nuevo PACK")
        self.add_btn.clicked.connect(self.add_new_pack)
        layout.addWidget(self.add_btn)

        self.scroll_area = QScrollArea()
        self.scroll_area.setWidgetResizable(True)
        layout.addWidget(self.scroll_area)

        self.form_widget = QWidget()
        self.form_layout = QFormLayout(self.form_widget)
        self.scroll_area.setWidget(self.form_widget)

        self.save_btn = QPushButton("💾 Guardar en JSON")
        self.save_btn.clicked.connect(self.save_json)
        layout.addWidget(self.save_btn)

        self.current_pack = None
        self.cell_inputs = []

        try:
            with open(PACKS_FILE, "r") as f:
                self.data = json.load(f)
        except FileNotFoundError:
            self.data = {}

    def add_new_pack(self):
        pack_number = len(self.data) + 1
        pack_name = f"PACK_{pack_number:06d}"
        self.data[pack_name] = pack_template()
        self.load_pack(pack_name)

    def load_pack(self, pack_name):
        self.current_pack = pack_name
        pack = self.data[pack_name]

        for i in reversed(range(self.form_layout.count())):
            self.form_layout.itemAt(i).widget().deleteLater()

        self.cell_inputs = []

        self.form_layout.addRow(QLabel(f"UUID: {pack['uuid']}"))
        self.form_layout.addRow(QLabel(f"Passport UUID: {pack['passport_uuid']}"))

        for i, cell in enumerate(pack["cells"]):
            inp = QLineEdit(cell)
            self.form_layout.addRow(QLabel(f"Cell {i+1}"), inp)
            self.cell_inputs.append(inp)

    def save_json(self):
        if not self.current_pack:
            QMessageBox.warning(self, "Error", "No hay PACK cargado")
            return
        self.data[self.current_pack]["cells"] = [inp.text() for inp in self.cell_inputs]
        with open(PACKS_FILE, "w") as f:
            json.dump(self.data, f, indent=2)
        QMessageBox.information(self, "Guardado", f"{self.current_pack} guardado")

class CellTab(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout(self)

        self.add_btn = QPushButton("➕ Añadir nueva CELL")
        self.add_btn.clicked.connect(self.add_new_cell)
        layout.addWidget(self.add_btn)

        self.scroll_area = QScrollArea()
        self.scroll_area.setWidgetResizable(True)
        layout.addWidget(self.scroll_area)

        self.form_widget = QWidget()
        self.form_layout = QFormLayout(self.form_widget)
        self.scroll_area.setWidget(self.form_widget)

        self.save_btn = QPushButton("💾 Guardar en JSON")
        self.save_btn.clicked.connect(self.save_json)
        layout.addWidget(self.save_btn)

        self.current_cell = None
        self.inputs = {}

        try:
            with open(CELLS_FILE, "r") as f:
                self.data = json.load(f)
        except FileNotFoundError:
            self.data = {}

    def add_new_cell(self):
        cell_number = len(self.data) + 1
        cell_name = f"CELL_{cell_number:06d}"
        self.data[cell_name] = cell_template()
        self.load_cell(cell_name)

    def load_cell(self, cell_name):
        self.current_cell = cell_name
        cell = self.data[cell_name]

        for i in reversed(range(self.form_layout.count())):
            self.form_layout.itemAt(i).widget().deleteLater()

        self.inputs = {}

        gi_date = QLineEdit(cell["GeneralInfo"]["manufacture_date"])
        self.form_layout.addRow(QLabel("Manufacture Date"), gi_date)
        self.inputs["manufacture_date"] = gi_date

        eol_v = QLineEdit(cell["EolTest"]["EOLvoltage"])
        eol_c = QLineEdit(cell["EolTest"]["EOLcurrent"])
        eol_r = QLineEdit(cell["EolTest"]["EOLresistance"])
        self.form_layout.addRow(QLabel("EOL Voltage"), eol_v)
        self.form_layout.addRow(QLabel("EOL Current"), eol_c)
        self.form_layout.addRow(QLabel("EOL Resistance"), eol_r)

        self.inputs["EOLvoltage"] = eol_v
        self.inputs["EOLcurrent"] = eol_c
        self.inputs["EOLresistance"] = eol_r

    def save_json(self):
        if not self.current_cell:
            QMessageBox.warning(self, "Error", "No hay CELL cargada")
            return
        self.data[self.current_cell]["GeneralInfo"]["manufacture_date"] = self.inputs["manufacture_date"].text()
        self.data[self.current_cell]["EolTest"]["EOLvoltage"] = self.inputs["EOLvoltage"].text()
        self.data[self.current_cell]["EolTest"]["EOLcurrent"] = self.inputs["EOLcurrent"].text()
        self.data[self.current_cell]["EolTest"]["EOLresistance"] = self.inputs["EOLresistance"].text()

        with open(CELLS_FILE, "w") as f:
            json.dump(self.data, f, indent=2)
        QMessageBox.information(self, "Guardado", f"{self.current_cell} guardada")

class BessTab(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout(self)

        self.add_btn = QPushButton("➕ Añadir nuevo BESS")
        self.add_btn.clicked.connect(self.add_new_bess)
        layout.addWidget(self.add_btn)

        self.scroll_area = QScrollArea()
        self.scroll_area.setWidgetResizable(True)
        layout.addWidget(self.scroll_area)

        self.form_widget = QWidget()
        self.form_layout = QFormLayout(self.form_widget)
        self.scroll_area.setWidget(self.form_widget)

        self.save_btn = QPushButton("💾 Guardar en JSON")
        self.save_btn.clicked.connect(self.save_json)
        layout.addWidget(self.save_btn)

        self.current_bess = None
        self.batpack_inputs = []

        try:
            with open(BESS_FILE, "r") as f:
                self.data = json.load(f)
        except FileNotFoundError:
            self.data = {}

    def add_new_bess(self):
        bess_number = len(self.data) + 1
        bess_name = f"BESS_{bess_number:06d}"
        self.data[bess_name] = bess_template()
        self.load_bess(bess_name)

    def load_bess(self, bess_name):
        self.current_bess = bess_name
        bess = self.data[bess_name]

        for i in reversed(range(self.form_layout.count())):
            self.form_layout.itemAt(i).widget().deleteLater()

        self.batpack_inputs = []

        self.form_layout.addRow(QLabel(f"UUID: {bess['uuid']}"))
        self.form_layout.addRow(QLabel(f"Passport UUID: {bess['passport_uuid']}"))

        for i, bp in enumerate(bess["batpacks"]):
            inp = QLineEdit(bp)
            self.form_layout.addRow(QLabel(f"Batpack {i+1}"), inp)
            self.batpack_inputs.append(inp)

    def save_json(self):
        if not self.current_bess:
            QMessageBox.warning(self, "Error", "No hay BESS cargado")
            return
        self.data[self.current_bess]["batpacks"] = [inp.text() for inp in self.batpack_inputs]
        with open(BESS_FILE, "w") as f:
            json.dump(self.data, f, indent=2)
        QMessageBox.information(self, "Guardado", f"{self.current_bess} guardado")

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Battery Manager")
        self.resize(700, 600)

        layout = QVBoxLayout(self)
        tabs = QTabWidget()

        tabs.addTab(PackTab(), "Packs")
        tabs.addTab(CellTab(), "Cells")
        tabs.addTab(BessTab(), "BESS")

        layout.addWidget(tabs)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    mw = MainWindow()
    mw.show()
    sys.exit(app.exec_())
