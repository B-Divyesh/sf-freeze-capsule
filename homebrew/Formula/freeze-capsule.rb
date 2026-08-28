class FreezeCapsule < Formula
  desc "Preserve bounded Linux freeze evidence before reboot"
  homepage "https://freeze-capsule.sociobot.in"
  version "0.1.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/B-Divyesh/sf-freeze-capsule/releases/download/v0.1.0/freeze-capsule-macos-aarch64.tar.gz"
      sha256 "eb48387029a7dbb2cf08b36734104003cc163c31ae9595280ade869bbf0c400e"
    else
      url "https://github.com/B-Divyesh/sf-freeze-capsule/releases/download/v0.1.0/freeze-capsule-macos-x86_64.tar.gz"
      sha256 "2dba1f81f70410f5dfe9be9fdcf574f68edcf1f2ffe547e5b858597606ff2e1b"
    end
  end

  on_linux do
    url "https://github.com/B-Divyesh/sf-freeze-capsule/releases/download/v0.1.0/freeze-capsule-linux-x86_64.tar.gz"
    sha256 "348f9fc3de82961bf8e101da3b6f509c70d9f6e51389008944c1ffca1589ad8a"
  end

  def install
    bin.install "freeze-capsule"
  end

  test do
    assert_match "Freeze Capsule", shell_output("#{bin}/freeze-capsule doctor")
  end
end
