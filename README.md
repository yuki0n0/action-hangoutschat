# action-hangoutschat

## Usage

```yaml
steps:
- uses: yuki0n0/action-hangoutschat@master
  if: failure()
  with:
    url: 'https://chat.googleapis.com/v1/spaces/...'
    text: '❌NG'
```