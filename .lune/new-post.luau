--> This is a script to create a new post markdown file with front-matter

local fs = require("@lune/fs")
local stdio = require("@lune/stdio")
local process = require("@lune/process")
local datetime = require("@lune/datetime")

local LuauPath = require("@pkg/luau-path")
type Path = LuauPath.Path
local Path = LuauPath.Path

local TARGET_DIR = Path.new("./src/content/posts/")
local FRONTMATTER_CONTENT = [[---
title: ${fileName}
published: ${date}
description: ''
image: ''
tags: []
category: ''
draft: false 
---
]]

local function main(args: { string }): number?
	local fileName = args[1]
	if not fileName then
		fileName = stdio.prompt("text", "Enter post name:")
	end

	local filePath = Path.new(fileName)
	if not filePath:extension() then
		filePath:setExtension("md")
	end

	local fullPath: Path = Path.join(TARGET_DIR, filePath)
	if fs.isFile(fullPath:toString()) then
		stdio.ewrite(`Error: File {fullPath} already exists!\n`)
		return 1
	end

	local editedContents = FRONTMATTER_CONTENT:gsub("${fileName}", fileName)
		:gsub("${date}", datetime.now():formatUniversalTime("%Y-%m-%dT%H:%M:%S"))

	fs.writeFile(fullPath:toString(), editedContents)
	print(`Post {fullPath} created!`)

	return 0
end

return process.exit(main(process.args))
