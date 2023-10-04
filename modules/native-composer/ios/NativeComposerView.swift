import ExpoModulesCore
import RichTextKit
// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class NativeComposerView: ExpoView {
    let view = RichTextView(string: NSAttributedString(string: ""))
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        addSubview(view)
    }
}
