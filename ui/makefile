.PHONY: build test
NODE_ENV ?= development

default:
	make build && make start-dev-server

build:
	node node_modules/.bin/webpack && \
		cp -r src/img/ build/img/ && \
		cp -r src/css/ build/css/ && \
		cp src/index.html build/index.html

test:
	@echo "setup tests"

start-dev-server:
	node node_modules/.bin/webpack-dev-server --host 0.0.0.0 --content-base build/
