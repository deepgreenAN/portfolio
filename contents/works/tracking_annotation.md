---
title: tracking annotation
use_code: true
use_katex: false
---

# [tracking-annotation](https://github.com/deepgreenAN/tracking_annotation)
<img src="https://dl.dropboxusercontent.com/s/kpzubae18doglle/simple_use.gif">

深層学習などを用いたトラッキングによって，動画から取得できる画像へのアノテーションを補助します．
GPU環境で行うのがおすすめです．
## セットアップ

```
git clone https://github.com/deepgreenAN/tracking_annotation
```

```
pipenv install
```
あるいは
```
pip install -r requirements.txt
```

### SiamMask(深層学習を用いたトラッキング手法)のセットアップ
visualstudioが必要となります．
```
cd backends
git clone https://github.com/foolwood/SiamMask.git
cd SiamMask
cd utils/pyvotkit
python setup.py build_ext --inplace
cd ../../
cd utils/pysot/utils/
python setup.py build_ext --inplace
```

### SiamMaskの重みファイルのダウンロード
- `backends/SiamMask/experiments/siammask_sharp`にこの[リンク](http://www.robots.ox.ac.uk/~qwang/SiamMask_DAVIS.pth)の重みファイルをダウンロード
### pysotのsetup
visualstudioが必要となります．
```
cd backends
git clone https://github.com/STVIR/pysot.git
cd pysot
python setup.py build_ext --inplace
```
### pysotの重みファイルのダウンロード
- `backends/pysot/experiments/siamrpn_alex_dwxcorr`にこの[リンク](https://drive.google.com/file/d/1e51IL1UZ-5seum2yUYpf98l2lJGUTnhs/view?usp=sharing)の重みファイルをダウンロード
- `backends/pysot/experiments/siamrpn_mobilev2_l234_dwxcorr`にこの[リンク](https://drive.google.com/file/d/1lPiRjFvajwrhOHVuXrygAj2cRb2BFFfz/view?usp=sharing)の重みファイルをダウンロード
- `backends/pysot/experiments/siammask_r50_l3`にこの[リンク](https://drive.google.com/file/d/1dQoI2o5Bzfn_IhNJNgcX4OE79BIHwr8s/view?usp=sharing)の重みファイルをダウンロード

## アプリケーションの起動
```
python app.py
```

## 対応しているトラッキング方法
- [SiamMask](https://github.com/foolwood/SiamMask)
- SiamRPN([pysot](https://github.com/STVIR/pysot))
- SiamMask([pysot](https://github.com/STVIR/pysot))
- KCF(opencv)
- CSRT(opencv)

## 使い方

### 入力ファイル
- 入力動画(.mp4)
- 入力json(.json)(作業の途中保存)

### 出力ファイル
- 出力画像ディレクトリ
- 出力json(.json)(ほとんど[detectron2](https://detectron2.readthedocs.io/en/latest/tutorials/datasets.html#standard-dataset-dicts)形式であり，そのまま学習できます)

### keybord
- h: このヘルプを別画面で開きます
- o: オプション画面を開きます
#### 画面の遷移
- n: 選択領域を基にトラッキングによって次フレームを推定+フレームを一つ進みます
- p: フレームを一つ戻ります
- t: フレームを一つ進ませます
- f: フレームの最初に戻ります
#### 選択オブジェクトの変更
- a: 選択オブジェクトを追加しそれに変更します
- c: 選択オブジェクトを変更します

### ラベル付け
- 画面右側でラベルと状態が変更できます
- 新しいオブジェクトボタンによってラベル付けを行うオブジェクトを追加できます

### オートモード
推定領域を基にさらに推定を繰り返していきます

### 矩形選択・ポリゴン選択モード
#### 矩形選択
領域を矩形で選択します
- 左クリックで左上点，右下点を選択します
#### ポリゴン選択
領域をポリゴンで選択します
- 左クリックで各点を順番に選択
- 閉じたポリゴンに対して右クリックで最も近い点を選択 -> 左クリックで移動位置を決定します
- 閉じたポリゴンに対して左ダブルクリックで最も近い辺に頂点を作成し選択-> 左クリックで位置を決定します

### 保存
指定されたパスにjsonファイルを保存します．オプションで指定すれば，動画としても保存します．

### キャッシュを削除
途中生成された画像ファイルのディレクトリ(/temp/images_*)を削除します．作業が途中であれば，残しておいた方が読み込みが早くなります．

## カスタムトラッカー
以下はKCFトラッカーの名前を変えたものです．
```python:trackers/opencv_tracker.py
import cv2

class CustomTracker:
    def __init__(self):
        self.tracker = cv2.TrackerKCF_create()
        
    def set_bbox(self, image, xyxy_dict=None, polygon_list=None):
        """
        image: ndarray 
          height,width,3
        xyxy_dict: dict
          {"x1":左上点のx,"y1":左上点のy,"x2":右下点のx,"y2":右下点のy}
        polygon_list: list of dict
          [{"x":x座標,"y":y座標},{"x":x座標,"y":y座標},{"x":x座標,"y":y座標},...]
        """
        if xyxy_dict is None:
            raise Exception("SiameseMaskTracker set_bbox need xyxy_dict")
        x1 = xyxy_dict["x1"]
        y1 = xyxy_dict["y1"]
        x2 = xyxy_dict["x2"]
        y2 = xyxy_dict["y2"]
        w = x2-x1
        h = y2-y1
        
        self.tracker.init(image, (x1,y1,w,h))
        
    def get_bbox(self, image):
        """
        parameters
        ----------
        image: ndarray 
          height,width,3   
        
        return
        ------
        out_dict: dict
          {"bbox_dict":xyxy_dict, "polygon":polygon_list} set_bboxの引数と同じ形式
        """
        success, xywh_bbox = self.tracker.update(image)
        
        if success:
            xyxy_dict = {"x1":int(xywh_bbox[0]),
                         "y1":int(xywh_bbox[1]),
                         "x2":int(xywh_bbox[0]+xywh_bbox[2]),
                         "y2":int(xywh_bbox[1]+xywh_bbox[3])
                        }
        else:
            xyxy_dict = None    
        
        out_dict = {"bbox_dict":xyxy_dict, "polygon":None}
        return out_dict
```
上記のように引数・返り値のうち必要のないものはNoneで指定します．次に`/tracker_factory.py`を以下のように変更します．
```python:/tracker_factory.py
tracker_symbols = [
  "SiamMask",
  "SiamMaskV2",
  "SiamRPN",
  "CSRT",
  "KCF",
  "Custom"
]
```
```python:/tracker_factory.py
def factory(symbol_str, is_cpu=True):
  if symbol_str not in tracker_symbols:
    raise Exception("tracker must be in {}".format(tracker_symbols))

  if symbol_str=="SiamMask":
    return SiamMaskTracker(is_cpu=is_cpu)
  elif symbol_str=="SiamMaskV2":
    return SiamMaskTrackerV2(is_cpu=is_cpu)
  elif symbol_str=="SiamRPN":
    return SiamRPNTracker(is_cpu=is_cpu)
  elif symbol_str=="CSRT":
    return CSRTTracker()
  elif symbol_str=="KCF":
    return KCFTracker()
  elif symbol_str=="Custom":
    return CustomTracker()
```
この変更によって，option画面で変更ができるようになります．デフォルトを変更したい場合は`app_config.py`を以下のように変更する．
```python:app_config.py
class Config:
  def __init__(self):
    self.make_video = False
    self.is_cpu = True
    self.tracker = factory("Custom", self.is_cpu)
```

