---
title: SSII2020発表論文
og_image_url: https://dl.dropboxusercontent.com/s/nr5pxpnlv0il2ty/full_model_structure_small.png
page_desc: 動画像から取得した骨格データからの個人識別において観測方向などを潜在変数としてモデルに組み込むために，深層学習を用いた生成モデルを用いたアプローチで識別を行った論文です．
use_code: false
use_katex: true
---
# SSII2020発表論文　[OpenPose で取得した時系列骨格データからの深層生成モデルによる個人識別](https://www.dropbox.com/s/6zbfsjm7c0biine/OpenPose%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E9%AA%A8%E6%A0%BC%E3%83%87%E3%83%BC%E3%82%BF%E3%81%8B%E3%82%89%E3%81%AE%E6%B7%B1%E5%B1%A4%E7%94%9F%E6%88%90%E3%83%A2%E3%83%87%E3%83%AB%E3%81%AB%E3%82%88%E3%82%8B%E5%80%8B%E4%BA%BA%E8%AD%98%E5%88%A5.pdf?dl=0)

<img src="https://dl.dropboxusercontent.com/s/1zg7wnch9ewyk44/full_model_structure_modified.png">

<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>動画像から取得した骨格データからの個人識別において観測方向などを潜在変数としてモデルに組み込むために，深層学習を用いた生成モデルを用いたアプローチで識別を行った論文です．生成モデルとして，連続に学習できる混合ガウス分布を用いた変分オートエンコーダ―を提案しています．ここでは混合ガウス分布を用いた変分オートエンコーダ―について解説します．  
変分オートエンコーダ―の学習では，事前分布と同じ確率分布を持つ近似事後分布を深層モデルでパラメタライズし変分推論します．この論文では事前分布と近似事後分布を混合ガウス分布とするため，混合ガウス分布からの勾配逆伝播可能なサンプリングと生成モデルの変分下限の計算が必要となります．

## 生成モデル
<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>混合ガウス分布に従う潜在変数を$z$とし，クラス分類におけるカテゴリを意味する潜在変数を$s$とすると，この変分オートエンコーダの生成モデルは以下で表せられます．
$$
\begin{equation*}
p(\boldsymbol{x}, \boldsymbol{z}, \boldsymbol{s})= p_{\theta}(\boldsymbol{x}|\boldsymbol{z},\boldsymbol{s})p(\boldsymbol{z}, \boldsymbol{s}) \tag{1}
\end{equation*}
$$
ここで，混合ガウス分布とする事前分布$p(\boldsymbol{z}, \boldsymbol{s})=p(\boldsymbol{z}|\boldsymbol{s})p(\boldsymbol{s})$は以下のようにカテゴリカル分布部分とガウス分布部分に分けられます
$$
\begin{align*}
p(\boldsymbol{z} | \boldsymbol{s}) &= 
\prod_{i=1}^{K} \mathcal{N}(
    \boldsymbol{z} | \boldsymbol{\mu_{i}}, \Sigma_{i}
)^{s_i} \\
p(\boldsymbol{s}) &= \prod_{i=1}^{K} \pi^{s_i}
\end{align*}
$$

## 混合ガウス分布からの勾配逆伝播可能なサンプリング
<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>カテゴリカル分布部分についてはConcrete Distribution[1]を用います．これはカテゴリカル分布に温度パラメータを導入して連続化したものです．次にガウス分布部分である$p(\boldsymbol{z} | \boldsymbol{s})$は対数をとって以下のように変形できます．

$$
\begin{align*}
\log p(\boldsymbol{z} | \boldsymbol{s})
&= \sum^{K}_{i=1}s_{i}\log \mathcal{N}(\boldsymbol{z} | \boldsymbol{\mu}_{i}, \Sigma_{i}) \\
&= \sum^{K}_{i=1} -\frac{s_{i}}{2} \Bigl\{ (\boldsymbol{z} - \boldsymbol{\mu}_{i})^{\mathsf{T}} \Sigma_{i}^{-1} (\boldsymbol{z} - \boldsymbol{\mu}_{i}) \Bigr\} + \mathrm{const.} \\
&= - \frac{1}{2} \Biggl[ 
    \boldsymbol{z}^{\mathsf{T}} 
    \Biggl\{
        \sum^{K}_{i=1}s_{i}\Sigma_{i}^{-1}
    \Biggr\} \boldsymbol{z}
    -
    2\boldsymbol{z}^{\mathsf{T}}
    \Biggl\{
        \sum^{K}_{i=1}s_{i}\Sigma_{i}^{-1}\boldsymbol{\mu}_{i}
    \Biggr\}
\Biggr]
+\mathrm{const.}
\end{align*}
$$

ここで，確率変数$\boldsymbol{z}$を含まない項を定数項$\mathrm{const.}$としてまとめています．上の式は確率変数$\boldsymbol{z}$について二次の多項式であるため，$p(\boldsymbol{z}|\boldsymbol{s})$はガウス分布となります．そしてその平均$\boldsymbol{\mu}_{\mathrm{gmm}}$
と共分散行列$\Sigma_{\mathrm{gmm}}$は以下となります．

$$
\begin{align*}
p(\boldsymbol{z} | \boldsymbol{s}) &= \mathcal{N} (\boldsymbol{z} | \boldsymbol{\mu}_{\mathrm{gmm}}, \Sigma_{\mathrm{gmm}}) \\
\Sigma_{\mathrm{gmm}}^{-1} &= \sum^{K}_{i=1}s_{i}\Sigma_{i}^{-1} \\
\boldsymbol{\mu}_{\mathrm{gmm}} &= \Sigma_{\mathrm{gmm}} 
\Biggl\{ 
    \sum^{K}_{i=1}s_{i}\Sigma_{i}^{-1}\boldsymbol{\mu}_{i}    
\Biggr\}
\end{align*}
$$

変分オートエンコーダ―では通常は共分散行列$\Sigma_{i}(i=1,\ldots,K)$を対角行列とするので逆行列は簡単に計算できます．結局，潜在変数$\boldsymbol{z}$はガウス分布のreparametarization-trick[2]によって勾配逆伝播可能なサンプリングができます．これはカテゴリカル潜在変数$\boldsymbol{s}$が連続であっても同様です．

## 変分下限
<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>式1で表される生成モデルの変分下限は以下となります．

$$
\begin{align*}
\mathcal{L}[\phi, \theta] &= 
\iint q_{\phi}(\boldsymbol{z}, \boldsymbol{s}| \boldsymbol{x})
\log \frac{p(\boldsymbol{x}, \boldsymbol{z}, \boldsymbol{s})}{q_{\phi}(\boldsymbol{z}, \boldsymbol{s}|\boldsymbol{x})} d\boldsymbol{z}d\boldsymbol{s} \\
&= \mathbb{E}_{\boldsymbol{z},\boldsymbol{s}\sim q_{\phi}(\boldsymbol{z}, \boldsymbol{s} | \boldsymbol{x})} 
\bigl[
    \log p_{\theta}(\boldsymbol{x}|\boldsymbol{z}, \boldsymbol{s}) 
\bigr] - D_{KL} 
\bigl[
    q_{\phi}(\boldsymbol{z}, \boldsymbol{s}|\boldsymbol{x}) ||
    p(\boldsymbol{z}, \boldsymbol{s})
\bigr]
\end{align*}
$$

この変分下限の負の値を学習の損失関数とします．ここで$D_{KL}$はKLダイバージェンスです．
上の式の第一項は再構成誤差と解釈できるため，第二項のKLダイバージェンス項について考えます．第二項は以下のように変形できます．

$$
\begin{align*}
D_{KL}
\bigl[
    q_{\phi}(\boldsymbol{z}, \boldsymbol{s} | \boldsymbol{x}) ||
    p(\boldsymbol{z}, \boldsymbol{s})
\bigr] 
&= 
\iint q_{\phi}(\boldsymbol{z}, \boldsymbol{s} | \boldsymbol{x})\log \frac{
        q_{\phi}(\boldsymbol{z}, \boldsymbol{s}|\boldsymbol{x})
}{
        p(\boldsymbol{z}, \boldsymbol{s})
}
d\boldsymbol{z}d\boldsymbol{s}  \\
&=
\iint q_{\phi}(\boldsymbol{z} | \boldsymbol{s}, \boldsymbol{x})
q_{\phi}(\boldsymbol{s} | \boldsymbol{x}) \log 
\frac{
    q_{\phi}(\boldsymbol{z} | \boldsymbol{s}, \boldsymbol{x})
    q_{\phi}(\boldsymbol{s} | \boldsymbol{x})
}{
    p(\boldsymbol{z} | \boldsymbol{s})p(\boldsymbol{s})
}d\boldsymbol{s}d\boldsymbol{z}  \\
&=
\iint q_{\phi}(\boldsymbol{z} | \boldsymbol{s}, \boldsymbol{x})
q_{\phi}(\boldsymbol{s} | \boldsymbol{x})\log
\frac{
    q_{\phi}(\boldsymbol{z} | \boldsymbol{s}, \boldsymbol{x})
}{
    p(\boldsymbol{z} | \boldsymbol{s})
}d\boldsymbol{z}d\boldsymbol{s}  \\
&\quad+
\iint q_{\phi}(\boldsymbol{z} | \boldsymbol{s}, \boldsymbol{x})
q_{\phi}(\boldsymbol{s} | \boldsymbol{x}) \log
\frac{
    q_{\phi}(\boldsymbol{s} | \boldsymbol{x})
}{
    p(\boldsymbol{s})
}d\boldsymbol{z}d\boldsymbol{s}  \\
&=
\int q_{\phi}(\boldsymbol{s} | \boldsymbol{x})
\int q_{\phi}(\boldsymbol{z} | \boldsymbol{s}, \boldsymbol{x}) \log
\frac{
    q_{\phi}(\boldsymbol{z} | \boldsymbol{s}, \boldsymbol{x})
}{
    p(\boldsymbol{z} | \boldsymbol{s})
}d\boldsymbol{z}d\boldsymbol{s}  \\
&\quad+
\int q_{\phi}(\boldsymbol{s} | \boldsymbol{x}) \log
\frac{
    q_{\phi}(\boldsymbol{s} | \boldsymbol{x})
}{
    p(\boldsymbol{s})
}d\boldsymbol{s}  \\
&=
\int q_{\phi}(\boldsymbol{s} | \boldsymbol{x})
D_{KL}
\bigl[
    q_{\phi}(\boldsymbol{z} | \boldsymbol{s}, \boldsymbol{z}) ||
    p(\boldsymbol{z} | \boldsymbol{s})
\bigr]d\boldsymbol{s}  \\
&\quad+
\int q_{\phi}(\boldsymbol{s} | \boldsymbol{x}) \log
\frac{
    q_{\phi}(\boldsymbol{s} | \boldsymbol{x})
}{
    p(\boldsymbol{s})
}d\boldsymbol{s}
\end{align*}
$$
$D_{KL}\bigl[ q_{\phi}(\boldsymbol{z} | \boldsymbol{s}, \boldsymbol{x}) || p(\boldsymbol{z} | \boldsymbol{s}) \bigr]$
はガウス分布のKLダイバージェンスであり解析的に計算できるので，第一項はConcrete Distributionに従うカテゴリ潜在変数$\boldsymbol{s}$のサンプリングによるモンテカルロ推定で近似計算計算できます．第二項はConcrete DistributionのKLダイバージェンスであるため，Concrete Distributionの対数尤度比をモンテカルロ推定によって近似計算できます[3]．以上で損失関数が計算できます．  
<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>論文では，このモデルを利用してクラス分類を行っています．教師データはConcrete Distributionの事前分布として与えています．

<hr>

[1]: [The concrete distribution: A
Continuous Relaxation of Discrete Random Variables](https://arxiv.org/abs/1611.00712)  
[2]: [Auto-Encoding Variational Bayes](https://arxiv.org/abs/1312.6114)  
[3]: [The concrete distribution: A
Continuous Relaxation of Discrete Random Variables](https://arxiv.org/abs/1611.00712)