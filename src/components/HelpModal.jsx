export default function HelpModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(45,42,74,0.55)' }}>
      <div className="cartoon-panel bg-white p-5 md:p-7 max-w-2xl w-full anim-bounceIn" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="text-center text-2xl md:text-3xl font-extrabold mb-4">❓ Hướng Dẫn Chơi</div>

        <div className="space-y-4">
          <div className="cartoon-panel p-3" style={{ background: '#ede9fe' }}>
            <div className="font-extrabold text-lg mb-1">🔀 2 Cách Chơi</div>
            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
              <li><b>Chơi Theo Tổ:</b> chia lớp thành 4 tổ, mỗi tổ có xe riêng đua về đích.</li>
              <li><b>Cả Lớp Cùng Chơi:</b> không chia tổ — từng bạn lần lượt lên chơi, điểm dồn chung vào 1 xe của cả lớp. Có thể nhập tên bạn đang chơi để ghi vào nhật ký lượt chơi.</li>
              <li>Bấm nút "🔁 Đổi Cách Chơi" ở đầu trang bất cứ lúc nào để chọn lại.</li>
            </ul>
          </div>

          <div className="cartoon-panel p-3" style={{ background: '#fee2e2' }}>
            <div className="font-extrabold text-lg mb-1">🎯 Trò 1: Đập Tan Thói Xấu - Bảo Vệ Đồ Dùng</div>
            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
              <li>Trong 30 giây, các nhân vật sẽ nhô lên từ 6 lỗ. Chạm thật nhanh vào chúng để ghi điểm.</li>
              <li>Quái Vật Thói Xấu (viền đỏ) sẽ biến thành Thiên Thần Giữ Gìn khi con chạm trúng.</li>
              <li>Thiên Thần Giữ Gìn (viền xanh) cũng cho điểm ngay khi chạm.</li>
              <li>Mỗi lần chạm trúng được +10 điểm cho tổ đang chơi.</li>
            </ul>
          </div>

          <div className="cartoon-panel p-3" style={{ background: '#dbeafe' }}>
            <div className="font-extrabold text-lg mb-1">🚗 Trò 2: Siêu Xe Hứng Đồ Tái Chế</div>
            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
              <li>Kéo/chạm trực tiếp trên đường đua hoặc bấm 2 nút mũi tên ◀️▶️ để di chuyển giỏ.</li>
              <li>Hứng đồ tái chế cần thiết (lõi giấy, chai nhựa, bút đậy nắp...) để +10 điểm và giỏ sáng lên.</li>
              <li>Né đồ bẩn/hỏng (vết mực, máy bay giấy, bút gãy...) — nếu hứng trúng sẽ -5 điểm và giỏ nổ lốp xoay vòng.</li>
              <li>Thời gian mỗi lượt 30 hoặc 45 giây, chọn ở màn hình chính.</li>
            </ul>
          </div>

          <div className="cartoon-panel p-3" style={{ background: '#fef9c3' }}>
            <div className="font-extrabold text-lg mb-1">🏁 Đường Đua &amp; Trao Cúp</div>
            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
              <li>Chọn tổ đang chơi ở màn hình chính trước khi bắt đầu 1 trong 2 trò.</li>
              <li>Điểm ghi được giúp xe tái chế của tổ chạy về đích trên đường đua phía trên.</li>
              <li>Khi có tổ về đích, hoặc giáo viên bấm "🏆 Tổng Kết Trao Cúp", màn hình vinh danh sẽ hiện ra kèm pháo hoa và xếp hạng.</li>
              <li>Chạm mở 3 rương kho báu để xem lợi ích của việc giữ gìn đồ dùng học tập.</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 justify-center mt-5 flex-wrap">
          <button className="btn-cartoon bg-gray-200 px-6 py-2" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
}
