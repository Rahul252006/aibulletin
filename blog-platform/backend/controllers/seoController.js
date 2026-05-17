import { convert } from "html-to-text";
import keywordExtractor from "keyword-extractor";

export const generateSEO = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required for SEO generation." });
    }

    const plainText = convert(content, {
      wordwrap: false,
      ignoreHref: true,
      ignoreImage: true,
    });

    let metaDescription = plainText.substring(0, 150).trim();
    if (plainText.length > 150) {
      metaDescription = metaDescription.substring(0, Math.min(metaDescription.length, metaDescription.lastIndexOf(" "))) + "...";
    }

    const extractedKeywords = keywordExtractor.extract(plainText, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
    });

    const tags = extractedKeywords.slice(0, 5);

    await new Promise(resolve => setTimeout(resolve, 800));

    res.json({
      metaTitle: title.length > 60 ? title.substring(0, 57) + "..." : title,
      metaDescription,
      tags
    });
  } catch (error) {
    console.error("SEO Gen Error:", error);
    res.status(500).json({ message: "Failed to generate SEO" });
  }
};
