# Unggah ke AWS Lambda
Requirements:
- serverless
- AWS accounts

Langkah pertama pastikan telah membuat (IAM users)[https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console] pada Akun AWS Lambda.


Install dan Konfigurasi Serverless Framework

```
npm install -g serverless
```

konfigurasi serverless cli untuk kebutuhan deployment:
```
npx sls config credentials \
--provider aws \
--key PUBLIC_KEY \
--secret SECRET_KEY
```

