import qrcode

uuid = "123e4567"
url = f"https://nelovick.github.io/battery-passport/"

img = qrcode.make(url)
img.save(f"qr_{uuid}.png")