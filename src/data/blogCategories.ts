export const blogCategories = [
  { value: "chon-mau", label: "Chọn mẫu & phối màu" },
  { value: "thi-cong", label: "Thi công & cải tạo" },
  { value: "bao-quan", label: "Vệ sinh & bảo quản" },
  { value: "chi-phi", label: "Chi phí & báo giá" },
] as const;
export const blogCategory = (value?: string) => blogCategories.find(item => item.value === value) || blogCategories[1];
