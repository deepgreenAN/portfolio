---
title: trade system
use_code: true
use_katex: false
---
# trade system
このパッケージは株式データの運用，取引の可視化，ポートフォリオ選択のための方策決定アルゴリズム，価格データの回帰(todo)のためのモジュールからなります．
現在利用できるのは以下の部分です．
- 株式データの取得・利用(`get_stock_price`, `portfolio/price_supply`)
- ポートフォリオ選択のための深層強化学習環境(`portfolit/rl_base/envs`)
- 取引の可視化(`visualization`)

## 株式データの取得・利用
### データの取得
```python
import sys
sys.path.append("./trading_system")
from get_stock_price import YahooFinanceStockLoaderMin
stock_names  = ["4755.T",]

stockloader = YahooFinanceStockLoaderMin(stock_names, stop_time_span=2.0, is_use_stop=False, to_tokyo=True)
stock_df = stockloader.load()
stock_df.tail(5)
```

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Open_4755</th>
      <th>High_4755</th>
      <th>Low_4755</th>
      <th>Close_4755</th>
      <th>Volume_4755</th>
    </tr>
    <tr>
      <th>timestamp</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2020-11-20 14:55:00+09:00</th>
      <td>1127.0</td>
      <td>1128.0</td>
      <td>1126.0</td>
      <td>1128.0</td>
      <td>41000.0</td>
    </tr>
    <tr>
      <th>2020-11-20 14:56:00+09:00</th>
      <td>1127.0</td>
      <td>1128.0</td>
      <td>1126.0</td>
      <td>1128.0</td>
      <td>53300.0</td>
    </tr>
    <tr>
      <th>2020-11-20 14:57:00+09:00</th>
      <td>1128.0</td>
      <td>1129.0</td>
      <td>1127.0</td>
      <td>1128.0</td>
      <td>20000.0</td>
    </tr>
    <tr>
      <th>2020-11-20 14:58:00+09:00</th>
      <td>1128.0</td>
      <td>1130.0</td>
      <td>1127.0</td>
      <td>1130.0</td>
      <td>76000.0</td>
    </tr>
    <tr>
      <th>2020-11-20 14:59:00+09:00</th>
      <td>1129.0</td>
      <td>1130.0</td>
      <td>1128.0</td>
      <td>1129.0</td>
      <td>94000.0</td>
    </tr>
  </tbody>
</table>
</div>

＊2021年11月現在yahoo-finance apiは利用できない状況でず

### データベースへのupsert
```python
from pathlib import Path
from get_stock_price import StockDatabase

db_path = Path("db/test_db") / Path("stock.db")
stock_db = StockDatabase(db_path)
stock_db.upsert(stock_df, item_replace_type="replace_null")
```

### 期間を指定してデータを取得
```python
from pathlib import Path
import datetime
from pytz import timezone

stock_names = ["6502"]

jst_timezone = timezone("Asia/Tokyo")

start_datetime = jst_timezone.localize(datetime.datetime(2020,11,18,9,0,0))
end_datetime = jst_timezone.localize(datetime.datetime(2020,11,18,15,0,0))

query_df = stock_db.search_span(stock_names=stock_names,
                                start_datetime=start_datetime,
                                end_datetime=end_datetime,
                                freq_str="10T",
                                to_tokyo=True
                               )

query_df.tail(5)
```

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Open_6502</th>
      <th>High_6502</th>
      <th>Low_6502</th>
      <th>Close_6502</th>
      <th>Volume_6502</th>
    </tr>
    <tr>
      <th>timestamp</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2020-11-18 14:10:00+09:00</th>
      <td>2840.0</td>
      <td>2845.0</td>
      <td>2835.0</td>
      <td>2836.0</td>
      <td>54900.0</td>
    </tr>
    <tr>
      <th>2020-11-18 14:20:00+09:00</th>
      <td>2837.0</td>
      <td>2838.0</td>
      <td>2817.0</td>
      <td>2818.0</td>
      <td>77700.0</td>
    </tr>
    <tr>
      <th>2020-11-18 14:30:00+09:00</th>
      <td>2818.0</td>
      <td>2822.0</td>
      <td>2810.0</td>
      <td>2822.0</td>
      <td>80600.0</td>
    </tr>
    <tr>
      <th>2020-11-18 14:40:00+09:00</th>
      <td>2823.0</td>
      <td>2826.0</td>
      <td>2821.0</td>
      <td>2824.0</td>
      <td>71500.0</td>
    </tr>
    <tr>
      <th>2020-11-18 14:50:00+09:00</th>
      <td>2823.0</td>
      <td>2835.0</td>
      <td>2823.0</td>
      <td>2835.0</td>
      <td>156600.0</td>
    </tr>
  </tbody>
</table>
</div>

## 深層強化学習の環境

