import pandas as pd

class SurveyAnalyzer:
    def __init__(self, file_stream, filename):
        self.df = self._load_data(file_stream, filename)
        # カラム名の定義などを定数として管理（変更に強くなる）
        self.COL_USER_TYPE = '0' # CSVの実際の列名に合わせる
        self.COL_SATISFACTION = '本日の説明会の満足度を教えてください'

    def _load_data(self, file, filename):
        """ファイルを読み込んでDataFrameを返すプライベートメソッド"""
        if filename.endswith('.csv'):
            return pd.read_csv(file)
        elif filename.endswith(('.xls', '.xlsx')):
            return pd.read_excel(file, sheet_name='フォームの回答 1')
        raise ValueError("Unsupported file format")

    def analyze(self):
        """分析結果の辞書を返すメインメソッド"""
        if self.df is None:
            return {}

        # 数値変換処理
        self.df[self.COL_SATISFACTION] = pd.to_numeric(
            self.df[self.COL_SATISFACTION], errors='coerce'
        )

        return {
            'students_total': self._count_by_type('新入生ご本人様'),
            'parents_total': self._count_by_type('保護者様'),
            'satisfaction': self._calculate_mean_satisfaction(),
            # ... 他の集計メソッド呼び出し
        }

    def _count_by_type(self, user_type):
        return int((self.df[self.COL_USER_TYPE] == user_type).sum())

    def _calculate_mean_satisfaction(self):
        val = self.df[self.COL_SATISFACTION].mean()
        return float(val) if pd.notna(val) else 0.0