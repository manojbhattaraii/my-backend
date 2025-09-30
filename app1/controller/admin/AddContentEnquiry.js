import ContentenquiryModel from "../../models/content.model.js";
import uploadOncloud from "../../utils/cloudnary.js";

const AddContent = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "No data provided" });
        }

        const { FTitle, htmlCode,cssCode,jsCode, FBody } = req.body;

        if (!FTitle || !FBody) {
            return res.status(400).json({ message: "All fields required" });
        }

        try {
            const result = await uploadOncloud(req.file.path);
            var  imglink = result.secure_url;
        } catch (err) {
            
            return res.status(500).json({ message: "Cloud upload failed", error: err.message });
        }

        const InsertContent = new ContentenquiryModel({
            title: FTitle,
            imgurl: imglink,
            Htmlcode: htmlCode,
            Csscode: cssCode,
            Jscode: jsCode,
            body: FBody,
        });

        await InsertContent.save();

        return res.status(201).json({ message: "Inserted successfully" });
    } catch (err) {
        
        return res.status(500).json({ message: "Server error" });
    }
};

export default AddContent;
