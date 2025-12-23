
import { ChristmasWish } from './types';

export const WISHES: ChristmasWish[] = [
  { id: 1, from: "Gia đình", message: "Chúc con một mùa Giáng sinh ấm áp, hạnh phúc và luôn tràn đầy niềm vui!", color: "#c0392b" },
  { id: 2, from: "Người ấy", message: "Giáng sinh này, món quà ý nghĩa nhất với anh chính là có em bên cạnh. Yêu em!", color: "#e84393" },
  { id: 3, from: "Bạn thân", message: "Chúc mày Noel này có gấu, không thì qua nhà tao uống bia nhé! Giáng sinh vui vẻ!", color: "#f1c40f" },
  { id: 4, from: "Đồng nghiệp", message: "Chúc bạn Giáng sinh an lành, năm mới KPI bùng nổ và luôn thăng tiến nhé!", color: "#27ae60" },
  { id: 5, from: "Thầy cô", message: "Chúc các em một kỳ nghỉ lễ thật vui tươi và chuẩn bị tốt cho những dự định sắp tới.", color: "#2980b9" },
  { id: 6, from: "Santa", message: "Ho ho ho! Chúc bạn luôn là một đứa trẻ ngoan và nhận được nhiều quà!", color: "#c0392b" },
  { id: 7, from: "Em gái", message: "Chúc chị yêu Giáng sinh rạng rỡ, xinh đẹp và sớm tìm được hoàng tử nhé!", color: "#8e44ad" },
  { id: 8, from: "Bố mẹ", message: "Cả nhà mình cùng đón Noel thật đầm ấm con nhé. Luôn tự hào về con!", color: "#d35400" }
];

export const COLORS = {
  tree: "#0f3824", // Deep forest green
  trunk: "#3e2723", // Dark wood
  background: "#050505",
  star: "#ffecb3",
  pot: "#2c3e50",
  lights: ["#ff0000", "#ffd700", "#00ff00", "#00ffff", "#ff69b4"] // Vivid lights
};
