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
