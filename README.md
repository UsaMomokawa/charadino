# charadino

Charaeno + Discord bot + Deno

[Charaeno](https://charaeno.com/) のキャラクターシートの技能値をチェックする
Discord bot です。

## 使い方

1. [botを導入する](https://discord.com/api/oauth2/authorize?client_id=1129353036876230698&permissions=2048&scope=bot%20applications.commands)
   - SCOPES: `bot`, `applications.commands`
   - BOT PERMISSIONS: `Send Messages`
2. `/check`コマンドを実行する
   - 条件:
     技能値の条件を不等号で指定します。カンマ区切りで複数条件を指定できます。
   - URL: Charaeno のキャラクターシートを指定します。
   - `/check こぶし>=70,回避>=30 https://charaeno.com/6th/{id}`

![/checkが返す結果](./docs/check.png)

## 開発

```shell
$ cp .env.example .env
$ deno task dev
```

## 仕組み

Deno で実装しています。

Discord のスラッシュコマンドをトリガに、Charaeno
APIを叩いてキャラクターシートの情報を取得します。条件をもとに技能値を検査して、結果を返します。

## モチベーション

クトゥルフ神話TRPGを遊ぶときに、意図せずキャラクターの技能値を振り忘れてしまうことがありました。キャラクターシートを隅々まで確認するのは大変なので、キャラクターの技能値の振り忘れをなくす仕組みを作りたいと考えました。
