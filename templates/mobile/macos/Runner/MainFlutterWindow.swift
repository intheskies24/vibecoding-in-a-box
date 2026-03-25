import Cocoa
import FlutterMacOS

class MainFlutterWindow: NSWindow {
  override func awakeFromNib() {
    let flutterViewController = FlutterViewController()
    self.contentViewController = flutterViewController

    // Size window to iPhone 15 Pro logical dimensions
    self.setContentSize(NSSize(width: 393, height: 852))
    self.center()
    self.title = "My App"

    RegisterGeneratedPlugins(registry: flutterViewController)
    super.awakeFromNib()
  }
}
