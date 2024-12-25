const diseaseAPI: diseaseItem[] = [
  {
      _id: '0',
      image: require('@/assets/images/disease/domla.png'),
      label: 'bercak_daun',
      title: 'Bệnh đóm lá vi khuẩn',
      summary: 'Các dấu hiệu đầu tiên của bệnh thường là những chấm nhỏ màu vàng xanh trên lá non, có thể thấy lá bị méo và co rúm. ',
      detail: `Triệu chứng bệnh trên cây: Các dấu hiệu đầu tiên của bệnh thường là những chấm
nhỏ màu vàng xanh trên lá non, có thể thấy lá bị méo và co rúm. Khi bệnh tiến triển,
các tổn thương trên lá già hình thành thành những vùng xanh đậm, có kết cấu nhờn và
thường được bao quanh bởi một vòng vàng. Các tổn thương này thường nằm ở mép và
đầu lá. Cuối cùng, các vết này có thể vỡ ra tạo thành lỗ hổng khi phần trung tâm khô
và rạn vỡ. Trên quả, các vết tổn thương ban đầu là những vùng xanh nhạt, sau đó sưng
lên, cuối cùng trở nên xù xì và chuyển sang màu nâu, đóng vảy.

- Các biện pháp phòng ngừa:
+ Chọn giống hạt được chứng nhận là không mang mầm bệnh.
+ Ưu tiên sử dụng các giống có khả năng chống chịu bệnh tốt nếu có sẵn tại khu vực.
+ Thường xuyên kiểm tra vườn để kịp thời phát hiện các triệu chứng bệnh.
+ Tiêu hủy những cây có dấu hiệu bệnh bằng cách đốt cháy chúng cùng với cây xung
quanh nếu có.
+ Dọn sạch cỏ dại xung quanh và trong vùng trồng để giảm nguồn lây lan bệnh.
+ Dùng lớp phủ xung quanh gốc cây để giảm thiểu sự lây lan bệnh từ đất.
+ Vệ sinh dụng cụ làm vườn sau khi sử dụng và tránh tưới nước trực tiếp lên lá, đặc
biệt khi lá còn ướt.
+ Cày xới đất để chôn vùi các phần cây bị bệnh sau mùa thu hoạch hoặc đốt chúng đi.
+ Thực hiện luân canh cây trồng 2-3 năm với các loại cây không nhạy cảm với bệnh
này
`,
  },
  {
      _id: '2',
      image: require('@/assets/images/disease/botri.jpg'),
      label: 'thrips',
      title: 'Bệnh bọ trĩ',
      summary: 'Bọ trĩ gây ra hậu quả nghiêm trọng đối với cây trồng do chúng lây lan và tăng mật số nhanh chóng. Bọ trĩ không ...',
      detail: `Tác hại của bọ trĩ: Bọ trĩ gây ra hậu quả nghiêm trọng đối với cây trồng do chúng lây lan và tăng mật số nhanh chóng. Bọ trĩ không chỉ gây hại trực tiếp bằng cách cắn và hút mầm non của lá và cành, mà còn là vector truyền các loại virus gây bệnh cho cây trồng, đặc biệt là virus trong nhóm Tospovirus (ví dụ như tomato spotted wilt virus, Watermelon silver mottle virus). Trên cây ớt, bọ trĩ thường tác động vào lá non, làm mép lá cong lên trên và gây biến dạng gân lá. Chúng cũng có thể gây rụng hoa và làm giảm phát triển của trái.

 Triệu chứng của sự tác động của bọ trĩ:
+ Chủ yếu gây hại trên lá và cành non của cây.
+ Làm cho mép lá non cong lên.
+ Lá bị ảnh hưởng, màu sắc nhợt hơn so với bình thường.
+ Làm cho phiến lá non phồng lên và gân lá biến dạng, cũng như làm cho chồi non phát triển kém.
 Biện pháp hoá học:
+ Phòng ngừa bọ trĩ từ giai đoạn cây còn non và mật độ bọ trĩ còn thấp bằng cách phun
thuốc.
+ Phun thuốc nên được thực hiện khi lá cây khô ráo và phun tập trung vào mặt dưới
của lá cây, cũng như vào các vùng khuất tại nơi bọ trĩ thường ẩn náu.
+ Cần sử dụng các loại thuốc có cơ chế hoạt động khác nhau để hạn chế sự phát triển
của sự kháng thuốc của bọ trĩ. Có thể kết hợp các loại thuốc như Brightin 4.0EC hoặc
Actimax 50WG lần lượt với Thiamax 25WG để đảm bảo hiệu quả.
`,
  },
  {
      _id: '3',
      image: require('@/assets/images/disease/heovang.jpg'),
      label: 'virus_kuning',
      title: 'Bệnh héo vàng',
      summary: 'Bệnh thường xuất hiện ở giai đoạn từ cây con đến khi ra hoa. Triệu chứng điển hình thường thấy là ...',
      detail: `Triệu chứng: Bệnh thường xuất hiện ở giai đoạn từ cây con đến khi ra hoa. Triệu chứng điển hình thường thấy là phần thân gần mặt đất bị nấm tạo thành mảng trên bề mặt thân, gây phá hủy hệ thống mạch dẫn của cây, làm cây héo và chết.
      
  Biện pháp phòng trừ:
+ Dọn sạch tàn dư cây bệnh trên đồng ruộng.
+ Luân canh với các loại cây trồng khác để ngăn ngừa sự lây lan của bệnh.
+ Chọn giống cây khỏe mạnh và không bị nhiễm bệnh để trồng.
+ Tránh gây tổn thương cho rễ trong quá trình trồng và chăm sóc.
+ Khi trồng, nên tạo luống cao và sâu để dễ thoát nước khi gặp mưa lớn.
+ Bón phân cân đối và hợp lý, tăng cường sử dụng phân hữu cơ.
+ Thường xuyên kiểm tra để phát hiện cây bị bệnh và nhổ bỏ kịp thời, đồng thời hạn
chế việc tưới nước để ngăn chặn sự lây lan của bệnh trên ruộng.
  Biện pháp hóa học: Do hiện chưa có thuốc được đăng ký để phòng trừ trong danh
mục, có thể tham khảo sử dụng một số loại thuốc BVTV có chứa hoạt chất như
Chlorothalonil, Polyphenol, Validamicin.    
      `,
  },

]
export default diseaseAPI