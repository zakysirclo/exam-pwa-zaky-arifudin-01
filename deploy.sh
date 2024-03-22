curl -X POST -H 'Content-type: application/json' --data '{"text":":warning: :understanding: Deployment swiftpwa.testingnow.me: in progress "}' https://hooks.slack.com/services/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
yarn install
yarn build
pm2 restart 0 --update-env
curl -X POST -H 'Content-type: application/json' --data '{"text":":warning: :understanding: Deployment swiftpwa.testingnow.me: done "}' https://hooks.slack.com/services/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

