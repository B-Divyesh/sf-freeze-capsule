class FreezeCapsule < Formula
  desc "Preserve bounded Linux freeze evidence before reboot"
  homepage "https://freeze-capsule.sociobot.in"
  version "0.1.2"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/B-Divyesh/sf-freeze-capsule/releases/download/v0.1.2/freeze-capsule-macos-aarch64.tar.gz"
      sha256 "02c392a3c59ac1b81f4ac83ce29c30b6264d6d128343fd001b433dddf7dca01b"
    else
      url "https://github.com/B-Divyesh/sf-freeze-capsule/releases/download/v0.1.2/freeze-capsule-macos-x86_64.tar.gz"
      sha256 "744a4af63b091f16461e74f055f8f18356b5c8cc4a5d5a9bb25176ae45f984df"
    end
  end

  on_linux do
    url "https://github.com/B-Divyesh/sf-freeze-capsule/releases/download/v0.1.2/freeze-capsule-linux-x86_64.tar.gz"
    sha256 "e458bc30122dd7f031aa4ccf87c0c3bdee7327be854d69a3abc73cf480f53e61"
  end

  def install
    bin.install "freeze-capsule"
  end

  test do
    assert_match "Freeze Capsule", shell_output("#{bin}/freeze-capsule doctor")
  end
end
