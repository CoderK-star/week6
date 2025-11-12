# 日本 過去3年間の地震データ分析

USGS FDSN Event API から日本周辺 (緯度 24–46, 経度 122–154) のマグニチュード 2.5 以上の地震を過去3年間分取得し、頻度分布・深さ分布・b値推定・月次トレンド・地図可視化を行った結果をまとめたリポジトリです。

## 収録ファイル
- `earthquake.ipynb` : 分析ノートブック (取得・前処理・集計・可視化)
- `earthquakes_japan_3y.csv` : 取得した生データ (USGS API)
- `year_counts.csv` / `month_counts.csv` / `monthly_trend.csv` : 集計結果
- `largest10.csv` : 最大マグニチュード上位10件
- `earthquakes_map.html` : Foliumで生成したインタラクティブ地震マップ
- `index.html` : GitHub Pages 用トップページ (地震マップ埋め込み)

## GitHub Pages 公開手順
1. リポジトリを GitHub 上に push します。
2. GitHub リポジトリ画面で: Settings → Pages を開きます。
3. "Build and deployment" で Source を `Deploy from a branch` に設定。
4. Branch を `main` / root (`/`) に設定し Save。
5. 数十秒〜数分後に公開 URL が表示されます (例: `https://<ユーザー名>.github.io/<リポジトリ名>/`).
6. 公開後、`index.html` がトップページとして表示され、地図 iframe が読み込まれます。

### 代替: `docs/` フォルダ方式
`index.html` を `docs/index.html` に置き、Pages の Branch: `main` / folder: `/docs` にする方法でも可。

## オフライン閲覧について
`earthquakes_map.html` は Leaflet やタイル画像を CDN / 外部サーバから読み込みます。オフライン環境で表示するには:
- タイルをローカルに落とす (利用規約注意) か、`tiles='Stamen Terrain'` など別レイヤーへ切替。
- あるいはネットワーク接続を有効にしてください。

## Notebook を HTML でエクスポート
ローカルで:
```powershell
jupyter nbconvert --to html earthquake.ipynb
```
生成された `earthquake.html` を追加で Pages に含めれば静的レポート閲覧が可能です。

## ローカルで VOICEVOX プロキシを使って起動する
ブラウザから VOICEVOX を直接呼ぶと CORS 制約で失敗する場合があるため、同一オリジンの簡易プロキシを用意しています。

1. VOICEVOX エンジンを起動 (例: http://localhost:50021)
2. プロキシを起動
	```powershell
	cd "c:\Users\kyuha\OneDrive - reitaku.jp\デスクトップ\Programming class\week6\proxy"
	npm install
	npm start
	```
	- プロキシは http://localhost:5173 で起動し、`/voicevox/*` を VOICEVOX へ中継、CORS ヘッダを付与します。
	- プロジェクト直下の静的ファイルも配信されます。
3. ブラウザで http://localhost:5173/interactive_map.html を開く
	- 右下ボタンからチャットを開くと、`/voicevox` 経由で VOICEVOX が利用されます。
	- うまくいかない場合は `chatbot.html` の URL に `&vv_debug=1` を付けてデバッグメッセージを確認してください。

## ライセンス / 注意
- USGS データはオープンですが利用時は出典を明記してください。
- 分析結果は教育目的のサンプルであり、リアルタイム監視や防災判断には公式情報を参照してください。

## 今後の拡張案
- b値の時系列推移
- 深さ別 / 地域グリッド別ヒートマップ
- マグニチュード頻度のモデル適合 (GR以外)
- 地図に時系列アニメーション (timestamped GeoJSON)

---
作成: 2025
