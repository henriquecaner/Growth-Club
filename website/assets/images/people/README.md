# People photos

Fotos dos especialistas que aparecem em `website/index.html` seção `home-people`.

## Naming convention

`<first-name>-<last-name>.jpg` (kebab-case, ASCII only, sem acentos).

Exemplo:
- `raphael-lassance.jpg`
- `gabriel-mineiro.jpg`
- `kalina-renno.jpg`
- `pedro-clivati.jpg`
- `marcelo-pimenta.jpg`
- `maikon-schiessl.jpg`
- `ricardo-correa.jpg`
- `felipe-spina.jpg`
- `thiago-reis.jpg`

## Specs

- Formato: JPG (preferred) ou PNG
- Dimensões mínimas: 280x280px (vai renderizar como 140x140px com retina)
- Aspect ratio: 1:1 (square)
- Tamanho: < 80kb cada (otimizar antes de commitar)
- Sem alpha (JPG basta)

## Fallback

Se o arquivo não existir, o markup mostra automaticamente a inicial em display Black via `<span class="home-person-initials">`. Markup já está pronto pra receber as fotos — basta fazer upload aqui.
