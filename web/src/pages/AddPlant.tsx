import React, { useState } from "react";
import { db, storage } from "../firebase"; // Ensure storage is exported from firebase.js
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload, Leaf, Loader, CheckCircle } from "lucide-react";

const AddPlant = () => {
    const [formData, setFormData] = useState({
        commonName: "",
        botanicalName: "",
        description: "",
        uses: "",
        sideEffects: "",
    });
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (!image) {
                throw new Error("Please upload an image of the plant.");
            }

            // 1. Upload Image
            const storageRef = ref(storage, `plants/${Date.now()}_${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // 2. Add to Firestore
            await addDoc(collection(db, "plants"), {
                ...formData,
                imageUrl: downloadURL,
                createdAt: new Date(),
                status: "pending_review", // Optional: for moderation
            });

            setSuccess(true);
            setFormData({
                commonName: "",
                botanicalName: "",
                description: "",
                uses: "",
                sideEffects: "",
            });
            setImage(null);
            setImagePreview(null);
        } catch (err: any) {
            console.error("Error adding plant:", err);
            setError(err.message || "Failed to add plant. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f0ead8] py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold text-[#556b2f] mb-4 flex items-center justify-center gap-3">
                        <Leaf size={40} />
                        Contribute to the Garden
                    </h1>
                    <p className="text-[#556b2f]/80 text-lg">
                        Help us grow our collection by adding missing medicinal plants.
                    </p>
                </div>

                <div className="bg-[#fdfbf7] rounded-3xl shadow-xl p-8 md:p-12 border border-[#556b2f]/10">
                    {success ? (
                        <div className="text-center py-12">
                            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="text-green-600" size={40} />
                            </div>
                            <h2 className="text-3xl font-serif text-[#556b2f] mb-4">
                                Thank You!
                            </h2>
                            <p className="text-[#556b2f]/70 text-lg mb-8">
                                Your contribution has been successfully submitted.
                            </p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="bg-[#556b2f] text-white px-8 py-3 rounded-full hover:bg-[#3e4e23] transition-all font-medium"
                            >
                                Add Another Plant
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Image Upload */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-[#556b2f] mb-2">
                                        Plant Image
                                    </label>
                                    <div
                                        className={`relative border-2 border-dashed border-[#556b2f]/30 rounded-2xl p-8 text-center hover:bg-[#556b2f]/5 transition-colors ${imagePreview ? "border-solid border-[#556b2f]" : ""
                                            }`}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            required
                                        />
                                        {imagePreview ? (
                                            <div className="relative h-64 w-full">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover rounded-xl shadow-md"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                                                    <span className="text-white font-medium">Change Image</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-48">
                                                <Upload size={48} className="text-[#556b2f]/40 mb-4" />
                                                <p className="text-[#556b2f]/60 font-medium">
                                                    Click or drag to upload an image
                                                </p>
                                                <p className="text-[#556b2f]/40 text-sm mt-1">
                                                    PNG, JPG up to 5MB
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Common Name */}
                                <div>
                                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                                        Common Name
                                    </label>
                                    <input
                                        type="text"
                                        name="commonName"
                                        value={formData.commonName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#556b2f]/20 focus:outline-none focus:ring-2 focus:ring-[#556b2f]/50 text-[#2d3748]"
                                        placeholder="e.g. Tulsi"
                                        required
                                    />
                                </div>

                                {/* Botanical Name */}
                                <div>
                                    <label className="block text-sm font-medium text-[#556b2f] mb-1">
                                        Botanical Name
                                    </label>
                                    <input
                                        type="text"
                                        name="botanicalName"
                                        value={formData.botanicalName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#556b2f]/20 focus:outline-none focus:ring-2 focus:ring-[#556b2f]/50 text-[#2d3748] italic"
                                        placeholder="e.g. Ocimum tenuiflorum"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-[#556b2f] mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#556b2f]/20 focus:outline-none focus:ring-2 focus:ring-[#556b2f]/50 text-[#2d3748]"
                                    placeholder="Brief description of the plant..."
                                    required
                                />
                            </div>

                            {/* Uses */}
                            <div>
                                <label className="block text-sm font-medium text-[#556b2f] mb-1">
                                    Medicinal Uses
                                </label>
                                <textarea
                                    name="uses"
                                    value={formData.uses}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#556b2f]/20 focus:outline-none focus:ring-2 focus:ring-[#556b2f]/50 text-[#2d3748]"
                                    placeholder="e.g. Colds, Stress relief..."
                                    required
                                />
                            </div>

                            {/* Side Effects */}
                            <div>
                                <label className="block text-sm font-medium text-[#556b2f] mb-1">
                                    Side Effects (Optional)
                                </label>
                                <textarea
                                    name="sideEffects"
                                    value={formData.sideEffects}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#556b2f]/20 focus:outline-none focus:ring-2 focus:ring-[#556b2f]/50 text-[#2d3748]"
                                    placeholder="Any known side effects..."
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#556b2f] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#3e4e23] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="animate-spin" /> Submitting...
                                    </>
                                ) : (
                                    "Submit Plant"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPlant;
