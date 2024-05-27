# vituum-template

Vite に Vituum を追加して制作した開発環境のサンプルです。

# public path

Vituum を使いつつ Vite のbase設定（パブリックパス設定）をすると、パスがズレて開発できません。
開発（development）はデフォルト設定、ビルド（production）では必要なパスを設定できるようにしました。
パブリックパスは、環境変数（.env、.env.production）の `VITE_BASE_PATH` で指定します。
