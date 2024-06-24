## Vituum-template

Vite に Vituum を追加して制作した開発環境のサンプルです。
htmlテンプレートエンジンには Nunjucks を使用してます。

## Project Structure

```
/
├── dist/     ...公開データ
├── public/   ...画像データなど静的アセッツ
└── src/      ...開発データ
	├── components
	│  └── include  ...部品データ
	├── data        ...案件に関わるデータ
	├── layouts     ...各ページで使用するレイアウト
	├── pages       ...各ページのデータ
	├── styles      ...共通スタイル
	│  ├── base     ...基本データ（リセットとベース設定）
	│  ├── design   ...デザインデータ（カスタムプロパティ）
	│  └── develop  ...開発用データ（mixinなど）
	└── types       ...型データ（必要に応じて）
```

## Command

| Command             | 説明                                             |
| ------------------- | ------------------------------------------------ |
| npm run dev         | 開発環境（vite）立ち上げる                       |
| npm run dev:convert | 画像自動処理を立ち上げる                         |
| npm run dev:all     | 開発環境（vite）と画像自動処理を同時に立ち上げる |
| npm run build       | 公開用データを生成する                           |
| npm run preview     | 公開用データの確認する                           |
| npm run svg         | 複数のsvgファイルを１つにまとめる                |

## Public path

Vituum を使いつつ Vite のbase設定（パブリックパス設定）をすると、パスがズレて開発できません。
開発（development）はデフォルト設定、ビルド（production）では必要なパスを設定できるようにしました。
パブリックパスは、環境変数（.env、.env.production）の `VITE_BASE_PATH` で指定します。

```
.env              ...開発用の環境変数
.env.production   ...公開用の環境変数
```

## Components

`src/components/`でコンポーネントを管理しています。
各コンポーネントのデータ（njk、scss、ts）を１つのフォルダに入れます。

## Import

ファイルをまとめて import するために `vituum-import` を使用しています。
componentsフォルダのscssファイルとtsファイルは一括で読み込むために、一段深いフォルダ（includeフォルダ）をつくってます。

## Page Data

Vituumには最低限の機能しかないので、各ページの設定は手動で管理する必要があります。
各ページ用の jsonファイルを編集します。

```json
{
  "pageId": "top",
  "pageTitle": "TOP PAGE",
  "pageDescription": "トップページです。",
  "pagePath": "/",
  "pageOgImage": ""
}
```

## Image

`npm run dev:all` で開発感用を立ち上げた場合、
`src/image/` に入れた `jpg` と `png` は自動で圧縮＆webp化され、
`public/` フォルダに画像を生成します。

ターゲットが最新ブラウザの場合、基本的にwebpだけ使用すれば問題ないです。<br/>
元画像、圧縮画像、webp画像と３種類をリポジトリで管理します（改善の余地あり）。

## SVG

`src/svg/` フォルダに入れたsvgファイルをsymbol化して、`public/assets/image/icons.svg` にまとめます。
主な目的としてアイコン管理を想定しています。

たとえば、 `arrow-right.svg` というファイル名のSVGファイルは、以下のように参照可能です。

```
<svg viewBox="0 0 24 24">
	<use href="/assets/svg/icons.svg#arrow-right"/>
</svg>
```

symbol化して`<use>`タグで使用することで、cssで簡単にスタイルをつけることができます。
