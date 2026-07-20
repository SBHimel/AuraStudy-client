export const imageUpload = async (image: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    // 🎯 নাম ঠিক করা হলো (_API_KEY)
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      console.error("ImgBB API Key is undefined! Check your .env.local file.");
      return null;
    }

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    
    const data = await res.json();

    if (data.success) {
      // 🎯 সরাসরি ইমেজের লিঙ্ক রিটার্ন করা হচ্ছে
      return data.data.display_url; 
    } else {
      console.error("ImgBB Upload Failed:", data);
      return null;
    }
  } catch (error) {
    console.error("Error in imageUpload:", error);
    return null;
  }
};