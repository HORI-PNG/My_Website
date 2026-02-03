import pandas as pd
import numpy as np

class DataService:
    @staticmethod
    def analyze_survey_data(df):
        # --- sample_api.py のロジックを完全再現 ---
        
        # 属性ごとのカウント
        students_total = (df['0'] == '新入生ご本人様').sum()
        parents_total = (df['0'] == '保護者様').sum()
        students_total_living_alone = ((df['一人暮らし予定か実家通学予定かお答えください'] == '一人暮らし予定') & (df['0'] == '新入生ご本人様')).sum()
        students_total_living_home = ((df['一人暮らし予定か実家通学予定かお答えください'] == '実家通学予定') & (df['0'] == '新入生ご本人様')).sum()
        parents_total_living_alone = ((df['一人暮らし予定か実家通学予定かお答えください'] == '一人暮らし予定') & (df['0'] == '保護者様')).sum()
        parents_total_living_home = ((df['一人暮らし予定か実家通学予定かお答えください'] == '実家通学予定') & (df['0'] == '保護者様')).sum()
        
        # 満足度の計算
        satisfaction = df['本日の説明会の満足度を教えてください'].mean()
        satisfaction_students = df[df['0'] == '新入生ご本人様']['本日の説明会の満足度を教えてください'].mean()
        satisfaction_parents = df[df['0'] == '保護者様']['本日の説明会の満足度を教えてください'].mean()
        
        # ラベル定義
        time_labels = ['短い', 'ちょうど良い', '長い']
        good_point_labels = [
            '大学生協のご説明',
            '九工大生の一日（通学編）', 
            '九工大生の一日（講義編）',
            '九工大生の一日（昼食編）',
            '九工大生の一日（学外編）',
            '九工大での4年間',
        ]

        # 1. 時間の集計関数（パーセント化）
        def time_get_counts(target_df):
            series = target_df['説明時間はいかがでしたか。'].dropna()
            total = len(series)
            
            if total == 0: 
                return [0] * len(time_labels)
            
            counts = series.value_counts().to_dict()
            return [int((counts.get(label, 0) / total) * 100) for label in time_labels]

        # 2. よかった点・全体/属性別（パーセント化）
        def good_point_get_counts(target_df):
            col_name = 'よかった、ためになった説明を教えてください'
            if col_name not in target_df.columns: 
                return [0] * len(good_point_labels)
            
            total_people = len(target_df)
            
            if total_people == 0: 
                return [0] * len(good_point_labels)
            
            series = target_df[col_name].dropna().astype(str)
            all_answers = series.str.split(r',\s*').explode()
            counts = all_answers.str.strip().value_counts().to_dict()
            
            return [int((counts.get(label, 0) / total_people) * 100) for label in good_point_labels]

        # 3. よかった点・居住形態別（パーセント化）
        def good_point_get_counts_by_living_status(target_df, target_status):
            col_name_point = 'よかった、ためになった説明を教えてください'
            col_name_living = '一人暮らし予定か実家通学予定かお答えください'
            
            if col_name_point not in target_df.columns or col_name_living not in target_df.columns:
                return [0] * len(good_point_labels)
            
            subset = target_df[target_df[col_name_living] == target_status]
            
            total_people = len(subset)
            
            if total_people == 0:
                return [0] * len(good_point_labels)
            
            series = subset[col_name_point].dropna().astype(str)
            all_answers = series.str.split(r',\s*').explode()
            counts = all_answers.str.strip().value_counts().to_dict()
            
            return [int((counts.get(label, 0) / total_people) * 100) for label in good_point_labels]

        students_df = df[df['0'] == '新入生ご本人様']
        parents_df = df[df['0'] == '保護者様']

        return {
            'status': 'success',
            'time_labels': time_labels,
            'time_data_all': time_get_counts(df),
            'time_data_students': time_get_counts(students_df),
            'time_data_parents': time_get_counts(parents_df),
            'good_point_labels': good_point_labels,
            'good_point_data_all': good_point_get_counts(df),
            'good_point_data_students': good_point_get_counts(students_df),
            'good_point_data_parents': good_point_get_counts(parents_df),
            'good_point_data_living_alone': good_point_get_counts_by_living_status(df, '一人暮らし予定'),
            'good_point_data_living_home': good_point_get_counts_by_living_status(df, '実家通学予定'),
            'students_total': int(students_total),
            'parents_total': int(parents_total),
            'students_total_living_alone': int(students_total_living_alone),
            'students_total_living_home': int(students_total_living_home),
            'parents_total_living_alone': int(parents_total_living_alone),
            'parents_total_living_home': int(parents_total_living_home),
            'satisfaction': float(satisfaction) if pd.notna(satisfaction) else 0.0,
            'satisfaction_students': float(satisfaction_students) if pd.notna(satisfaction_students) else 0.0,
            'satisfaction_parents': float(satisfaction_parents) if pd.notna(satisfaction_parents) else 0.0,
            'data_sum': 8 # sample_api.py の固定値
        }