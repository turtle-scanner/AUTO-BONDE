import os
import json
import tkinter as tk
from tkinter import ttk, messagebox

class BondeDashboardApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Bonde Bot Tactical Dashboard v3.3")
        self.root.geometry("950x750")
        self.root.configure(bg="#0b0e14")
        
        # 보안 설정
        self.target_id = "cntfed"
        self.target_pw = "cntfed"
        
        # 사용자 지정 가격 데이터 (최종)
        self.cash_deposit = 297791
        self.prices = {
            "NVDA": 213.0,      # $213
            "MU": 742000.0,     # 742,000원
            "001780": 3260.0    # 3,260원
        }
        self.usd_krw = 1400.0   # 환율
        
        # 데이터 경로
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.watchlist_path = os.path.join(self.base_dir, "bonde_watchlist.json")
        self.positions_path = os.path.join(self.base_dir, "bonde_active_positions.json")
        
        self.setup_login()

    def setup_login(self):
        self.login_frame = tk.Frame(self.root, bg="#171c26", padx=50, pady=50)
        self.login_frame.place(relx=0.5, rely=0.5, anchor="center")
        tk.Label(self.login_frame, text="BONDE SECURE GATEWAY", font=("Outfit", 18, "bold"), fg="#00d2ff", bg="#171c26").pack(pady=(0, 30))
        self.id_entry = tk.Entry(self.login_frame, font=("Outfit", 12), width=25, bg="#0b0e14", fg="white")
        self.id_entry.insert(0, "cntfed"); self.id_entry.pack(pady=5)
        self.pw_entry = tk.Entry(self.login_frame, font=("Outfit", 12), width=25, show="*", bg="#0b0e14", fg="white")
        self.pw_entry.pack(pady=15)
        tk.Button(self.login_frame, text="ENTER", command=self.check_login, bg="#00ff88", width=20).pack()

    def check_login(self):
        if self.id_entry.get() == "cntfed" and self.pw_entry.get() == "cntfed":
            self.login_frame.destroy(); self.setup_dashboard()
        else: messagebox.showerror("Error", "Login Failed")

    def _calculate_total(self):
        # NVDA: 17주 * $213 * 1400
        nvda_val = 17 * self.prices["NVDA"] * self.usd_krw
        # MU: 1주 * 742000
        mu_val = 1 * self.prices["MU"]
        # Aluko: 2주 * 3260
        aluko_val = 2 * self.prices["001780"]
        return int(nvda_val + mu_val + aluko_val + self.cash_deposit)

    def setup_dashboard(self):
        total = self._calculate_total()
        header = tk.Frame(self.root, bg="#171c26", height=70)
        header.pack(fill="x")
        tk.Label(header, text=f"TOTAL ASSETS: ₩{total:,}", font=("Outfit", 18, "bold"), fg="#00ff88", bg="#171c26", padx=20).pack(side="left")

        content = tk.Frame(self.root, bg="#0b0e14", padx=30, pady=20)
        content.pack(fill="both", expand=True)

        # 요약 카드
        summary = tk.Frame(content, bg="#0b0e14")
        summary.pack(fill="x", pady=10)
        self.create_card(summary, "Cash", f"₩{self.cash_deposit:,}", "#00d2ff").grid(row=0, column=0, padx=5)
        self.create_card(summary, "Stock Value", f"₩{(total-self.cash_deposit):,}", "#ff4d4d").grid(row=0, column=1, padx=5)

        # 보유 목록
        tk.Label(content, text="PORTFOLIO", fg="#94a3b8", bg="#0b0e14", font=("Outfit", 10, "bold")).pack(anchor="w", pady=10)
        tree = ttk.Treeview(content, columns=["NAME", "QTY", "PRICE", "TOTAL"], show="headings", height=5)
        tree.pack(fill="x")
        for col in ["NAME", "QTY", "PRICE", "TOTAL"]: tree.heading(col, text=col); tree.column(col, width=100, anchor="center")
        
        # 데이터 삽입
        tree.insert("", "end", values=("NVIDIA", "17", f"${self.prices['NVDA']}", f"₩{(17*self.prices['NVDA']*self.usd_krw):,.0f}"))
        tree.insert("", "end", values=("Micron", "1", f"₩{self.prices['MU']:,}", f"₩{self.prices['MU']:,}"))
        tree.insert("", "end", values=("Aluko", "2", f"₩{self.prices['001780']:,}", f"₩{(2*self.prices['001780']):,}"))

    def create_card(self, parent, t, v, c):
        f = tk.Frame(parent, bg="#171c26", padx=20, pady=10, highlightthickness=1, highlightbackground="#334155")
        tk.Label(f, text=t, fg="#94a3b8", bg="#171c26").pack()
        tk.Label(f, text=v, fg=c, bg="#171c26", font=("Outfit", 14, "bold")).pack()
        return f

if __name__ == "__main__":
    root = tk.Tk(); app = BondeDashboardApp(root); root.mainloop()
