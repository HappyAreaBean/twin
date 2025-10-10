FROM oven/bun:1
WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

VOLUME ["/app/upload"]
COPY ./upload/* /app/upload

RUN chown -R bun /app/upload

USER bun
EXPOSE 5000/tcp
CMD ["bun", "run", "dev"]