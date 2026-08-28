class FreezeCapsule < Formula
  desc "Preserve bounded Linux freeze evidence before reboot"
  homepage "https://freeze-capsule.sociobot.in"
  version "0.1.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/B-Divyesh/sf-freeze-capsule/releases/download/v0.1.0/freeze-capsule-macos-aarch64.tar.gz"
      sha256 "RELEASE_WORKFLOW_REPLACES_THIS"
    else
      url "https://github.com/B-Divyesh/sf-freeze-capsule/releases/download/v0.1.0/freeze-capsule-macos-x86_64.tar.gz"
      sha256 "RELEASE_WORKFLOW_REPLACES_THIS"
    end
  end

  on_linux do
    url "https://github.com/B-Divyesh/sf-freeze-capsule/releases/download/v0.1.0/freeze-capsule-linux-x86_64.tar.gz"
    sha256 "RELEASE_WORKFLOW_REPLACES_THIS"
  end

  def install
    bin.install "freeze-capsule"
  end

  test do
    assert_match "Freeze Capsule", shell_output("#{bin}/freeze-capsule doctor")
  end
end
