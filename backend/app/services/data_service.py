import pandas as pd
import os

class SurveyAnalyzer:
    """アンケートデータを分析するクラス"""
    
    def __init__(self):
        # カラム名の定義（CSVのヘッダーに合わせて調整してください）
        self.COL_USER_TYPE = '0' # 例: 参加者種別 ('新入生ご本人様' など)
        self.COL_SATISFACTION = '本日の説明会の満足度を教えてください'

    def load_data(self, file_stream, filename):
        """ファイルを読み込んでDataFrameを返す"""
        try:
            if filename.endswith('.csv'):
                return pd.read_csv(file_stream)
            elif filename.endswith(('.xls', '.xlsx')):
                return pd.read_excel(file_stream)
            else:
                raise ValueError("未対応のファイル形式です")
        except Exception as e:
            raise ValueError(f"ファイルの読み込みに失敗しました: {str(e)}")

    def analyze(self, file_stream, filename):
        """メインの分析処理"""
        df = self.load_data(file_stream, filename)
        
        # 必要なデータを計算
        result = {
            'file_name': filename,
            'students_total': self._count_by_type(df, '新入生ご本人様'),
            'parents_total': self._count_by_type(df, '保護者様'),
            'satisfaction': self._calculate_mean_satisfaction(df)
        }
        return result

    def _count_by_type(self, df, user_type):
        """指定された種別の人数をカウント"""
        if self.COL_USER_TYPE not in df.columns:
            return 0
        return int((df[self.COL_USER_TYPE] == user_type).sum())

    def _calculate_mean_satisfaction(self, df):
        """満足度の平均を計算"""
        if self.COL_SATISFACTION not in df.columns:
            return 0.0
            
        # 数値に変換（変換できない文字はNaNにする）
        numeric_series = pd.to_numeric(df[self.COL_SATISFACTION], errors='coerce')
        val = numeric_series.mean()
        
        # NaN（計算不能）の場合は0を返す
        return float(val) if pd.notna(val) else 0.0