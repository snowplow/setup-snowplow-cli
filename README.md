# Setup snowplow-cli action

This action will install [snowplow-cli](https://github.com/snowplow/snowplow-cli) for use in your github workflows

## Example usage

Latest release

```yaml
uses: snowplow/setup-snowplow-cli@v1
```

Or specify a release version from [snowplow-cli releases](https://github.com/snowplow-product/snowplow-cli/releases)

```yaml
uses: snowplow/setup-snowplow-cli@v1
with:
  version: v0.0.9
```
