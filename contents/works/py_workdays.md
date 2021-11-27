---
title: py-workdays
page_desc: 営業日のデータを取得，営業時間での演算，`pandas.DataFrame`からの営業日・営業時間のデータの抽出ができるライブラリ．
og_image_url: /logo_icon.png
use_code: true
use_katex: false
---

# py-workdays

営業日のデータを取得，営業時間での演算，`pandas.DataFrame`からの営業日・営業時間のデータの抽出ができます．計算にrustを用いており[高速](https://github.com/deepgreenAN/py_workdays_rs/wiki/%E9%80%9F%E5%BA%A6%E3%82%92%E8%A8%88%E6%B8%AC)に動作します．
## 使い方
###  指定期間の営業日を取得


```python
import datetime
from py_workdays import get_workdays

start_date = datetime.date(2021,1,1)
end_date = datetime.date(2021,2,1)

workdays = get_workdays(start_date, end_date)
workdays
```

```
array([datetime.date(2021, 1, 4), datetime.date(2021, 1, 5),
        datetime.date(2021, 1, 6), datetime.date(2021, 1, 7),
        datetime.date(2021, 1, 8), datetime.date(2021, 1, 12),
        datetime.date(2021, 1, 13), datetime.date(2021, 1, 14),
        datetime.date(2021, 1, 15), datetime.date(2021, 1, 18),
        datetime.date(2021, 1, 19), datetime.date(2021, 1, 20),
        datetime.date(2021, 1, 21), datetime.date(2021, 1, 22),
        datetime.date(2021, 1, 25), datetime.date(2021, 1, 26),
        datetime.date(2021, 1, 27), datetime.date(2021, 1, 28),
        datetime.date(2021, 1, 29)], dtype=object)
```


### 営業日かどうか判定


```python
from py_workdays import check_workday
select_date = datetime.date(2021,1,1)

check_workday(select_date)
```

```
False
```


### 次の営業日を取得


```python
from py_workdays import get_next_workday
select_date = datetime.date(2021,1,1)

next_workday = get_next_workday(select_date, days=6)
next_workday
```

```
datetime.date(2021, 1, 12)
```


### 指定する日数分の営業日を取得 


```python
from py_workdays import get_workdays_number

start_date = datetime.date(2021,1,1)
days = 19

workdays = get_workdays_number(start_date, days)
workdays
```

```
array([datetime.date(2021, 1, 4), datetime.date(2021, 1, 5),
        datetime.date(2021, 1, 6), datetime.date(2021, 1, 7),
        datetime.date(2021, 1, 8), datetime.date(2021, 1, 12),
        datetime.date(2021, 1, 13), datetime.date(2021, 1, 14),
        datetime.date(2021, 1, 15), datetime.date(2021, 1, 18),
        datetime.date(2021, 1, 19), datetime.date(2021, 1, 20),
        datetime.date(2021, 1, 21), datetime.date(2021, 1, 22),
        datetime.date(2021, 1, 25), datetime.date(2021, 1, 26),
        datetime.date(2021, 1, 27), datetime.date(2021, 1, 28),
        datetime.date(2021, 1, 29)], dtype=object)
```


### 営業日・営業時間内か判定

デフォルトでは，東京証券取引所の営業日(土日・祝日，振替休日を除く)・営業時間(9時～11時30分，12時30分～15時)として利用できます． 


```python
from py_workdays import check_workday_intraday

select_datetime = datetime.datetime(2021,1,4,10,0,0)

check_workday_intraday(select_datetime)
```

```
True
```


### 指定日時から最も近い次の営業日・営業時間の日時を取得


```python
from py_workdays import get_next_border_workday_intraday
select_datetime = datetime.datetime(2021,1,1,0,0,0)

next_border_datetime, border_symbol = get_next_border_workday_intraday(select_datetime)
next_border_datetime, border_symbol
```

```
(datetime.datetime(2021, 1, 4, 9, 0), 'border_start')
```


### 指定日時とtimedeltaから営業時間分加算する

減算もできます．

```python
from py_workdays import add_workday_intraday_datetime, 

select_datetime = datetime.datetime(2021,1,1,0,0,0)

added_datetime = add_workday_intraday_datetime(select_datetime, datetime.timedelta(hours=2))
added_datetime
```

```
datetime.datetime(2021, 1, 4, 11, 0)
```


### 指定期間の営業時間分のtimedeltaを取得する


```python
from pytz import timezone
from py_workdays import get_timedelta_workdays_intraday

jst = timezone("Asia/Tokyo")

start_datetime = jst.localize(datetime.datetime(2021,1,1,0,0,0))
end_datetime = jst.localize(datetime.datetime(2021,1,4,15,0,0))

workdays_intraday_timedelta = get_timedelta_workdays_intraday(start_datetime, end_datetime)
workdays_intraday_timedelta
```

```
datetime.timedelta(seconds=18000)
```

```python
5*60*60  # ５時間分
```

```
18000
```

### 既存のpandas.DataFrameから営業日・営業時間のものを取得

営業日のもののみ抽出・営業時間のもののみ抽出もできます． 


```python
import bokeh

with open("develops/aware_stock_df.pickle", "rb") as f:
    aware_stock_df = pickle.load(f)
    
x = np.arange(0, len(aware_stock_df))
p = bokeh.plotting.figure(plot_width=1000, plot_height=500)
p.line(x, aware_stock_df["Close_6502"])
show(p)
```

<img src="https://dl.dropboxusercontent.com/s/kwn4se2e7dwj49p/raw_stock_df.png">


```python
from py_workdays import extract_workdays_intraday

extracted_stock_df = extract_workdays_intraday(aware_stock_df)

x = np.arange(0, len(extracted_stock_df))
p = bokeh.plotting.figure(plot_width=1000, plot_height=500)
p.line(x, extracted_stock_df["Close_6502"])
show(p)
```

<img src="https://dl.dropboxusercontent.com/s/1mt3v00yrnrjbfs/extract_stock_df_ver1.png">

途中1日分データが抜けているがこれはデータの方のミスです


### Option 

#### 祝日・休日の探索期間

祝日・休日はデフォルトでは現在年の5年前から利用できます．開始・終了年はオプションから変更できます．


```python
from py_workdays import option

# default
print(option.holiday_start_year)
print(option.holidays_date_array[:5])
print(option.holiday_end_year)
print(option.holidays_date_array[-5:])
```

```
2016
[datetime.date(2016, 1, 1) datetime.date(2016, 1, 11)
    datetime.date(2016, 2, 11) datetime.date(2016, 3, 20)
    datetime.date(2016, 3, 21)]
2021
[datetime.date(2021, 8, 9) datetime.date(2021, 9, 20)
    datetime.date(2021, 9, 23) datetime.date(2021, 11, 3)
    datetime.date(2021, 11, 23)]
``` 

#### 休日の取得 

休日の所得はcsvファイルを利用します．csvは複数のパスを指定でき，
```
python scrape_and_make_source.py
```
で自動でスクレイピングできます．(ネット環境が必要となります)


```python
# default
print(option.backend)
print(option.csv_source_paths)
```

```
csv
[WindowsPath('py_workdays/source/holiday_naikaku.csv')]
``` 

ここで，`csv_source_paths`のデフォルトは自動的にpyworkdaysのあるディレクトリのsourceディレクトリ内のholiday_naikaku.csv一つです．

#### 休日曜日・営業時間

休日とする曜日を整数で指定できます．デフォルトは土日(5,6)．営業時間は東京証券取引所のものであり，開始時間と終了時間のペアを複数指定できます．


```python
# default
print(option.holiday_weekdays)
print(option.intraday_borders)
```

```
[5, 6]
[[datetime.time(9, 0), datetime.time(11, 30)], [datetime.time(12, 30), datetime.time(15, 0)]]
``` 

#### Optionの変更 

下の例では代入していますが，リストの場合はappendでも大丈夫です．optionの値を初期化したいときは`option.__init__()`か`option.initialize()`を呼びます．


```python
option.intraday_borders = [[datetime.time(9, 0), datetime.time(13, 0)]]
```

csv_source_pathは追加するだけで取得できる休日が更新されます．
```python
from pathlib import Path
some_source_path = Path("some_source.csv")
option.csv_source_path.append(some_source_path)
```
some_source.csvは以下のような形式になっている必要があります．
```
1955-01-01,元日
1955-01-15,成人の日
1955-03-21,春分の日
```

