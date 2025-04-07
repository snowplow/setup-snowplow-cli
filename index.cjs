/**
 * Copyright (c) 2013-present Snowplow Analytics Ltd.
 * All rights reserved.
 *
 * This software is made available by Snowplow Analytics, Ltd.,
 * under the terms of the Snowplow Limited Use License Agreement, Version 1.0
 * located at https://docs.snowplow.io/limited-use-license-1.0
 * BY INSTALLING, DOWNLOADING, ACCESSING, USING OR DISTRIBUTING ANY PORTION
 * OF THE SOFTWARE, YOU AGREE TO THE TERMS OF SUCH LICENSE AGREEMENT.
 */

const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const os = require('os')
const fs = require('fs')
const path = require('path')

async function setup() {
  const version = core.getInput('version')

  let arch = os.arch()
  if (arch === 'x64') {
    arch = 'x86_64'
  }
  let platform = os.platform()
  if (platform === 'win32') {
    platform = 'windows'
  }

  const exe = platform === 'windows' ? '.exe' : ''

  const pathToCli = fs.mkdtempSync(path.join(os.tmpdir(), 'tmp'))

  const url = `https://github.com/snowplow/snowplow-cli/releases/${version}/download/snowplow-cli_${platform}_${arch}${exe}`

  core.debug(`version: ${version}, release path: ${url}`)

  /** @type string */
  let pathToExe
  try {
    pathToExe = await tc.downloadTool(url, path.join(pathToCli, 'snowplow-cli'))
  } catch (e) {
    if (e instanceof tc.HTTPError && e.httpStatusCode === 404) {
      console.error(
        `failed to download snowplow-cli, check version and platform. url: ${url}`
      )
    }
    throw e
  }

  fs.chmodSync(pathToExe, '755')

  core.addPath(pathToCli)
}

setup()
