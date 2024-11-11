import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

const Policy = () => {
  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <Typography>
        <Title level={1}>Chính Sách Ký Gửi Cá Koi Online và Offline</Title>

        <section>
          <Title level={2}>1. Giới Thiệu</Title>
          <Paragraph>
            Chính Sách Ký Gửi Cá Koi Online và Offline (&quot;Chính Sách&quot;)
            này quy định các điều khoản khi chủ sở hữu cá koi sử dụng dịch vụ ký
            gửi của [Tên Trang Trại/ Công Ty Koi] để bán hoặc chăm sóc cá. Chính
            sách này được áp dụng cho cả ký gửi trực tiếp tại trang trại
            (offline) và ký gửi thông qua hệ thống trực tuyến (online). Việc sử
            dụng bất kỳ hình thức ký gửi nào đều đồng nghĩa với việc bạn đã chấp
            nhận các điều khoản này.
          </Paragraph>
        </section>

        <Divider />

        <section>
          <Title level={2}>2. Điều Khoản Ký Gửi</Title>

          <Title level={3}>2.1 Ký Gửi Offline (Trực Tiếp tại Trang Trại)</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Mục Đích Ký Gửi:</b> Chủ sở hữu có thể ký gửi cá koi tại trang
              trại để được chăm sóc chuyên nghiệp hoặc chờ bán.
            </li>
            <li>
              <b>Phí Ký Gửi:</b> Một khoản phí cố định hoặc tỷ lệ phần trăm được
              tính dựa trên loại hình ký gửi. Phí này bao gồm chi phí chăm sóc
              và bảo trì cơ sở vật chất.
            </li>
            <li>
              <b>Thời Hạn Ký Gửi:</b> Thời gian ký gửi tiêu chuẩn là [thời hạn,
              ví dụ: 3 tháng]. Sau thời hạn, chủ sở hữu có thể lựa chọn gia hạn
              hoặc nhận lại cá.
            </li>
            <li>
              <b>Giao Dịch Mua Bán:</b> Mọi giao dịch mua bán cá koi sẽ do đội
              ngũ trang trại thực hiện. Sau khi bán, [phần trăm, ví dụ: 80%] số
              tiền bán sẽ được chuyển cho chủ sở hữu sau khi trừ các khoản phí.
            </li>
          </ul>

          <Title level={3}>2.2 Ký Gửi Online (Qua Hệ Thống Trực Tuyến)</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Quy Trình Đăng Ký Online:</b> Chủ sở hữu đăng ký ký gửi trên
              website hoặc ứng dụng của [Tên Trang Trại/ Công Ty Koi] và cung
              cấp các thông tin cần thiết về cá koi, bao gồm hình ảnh, thông tin
              giống loài, tình trạng sức khỏe, và giá bán mong muốn.
            </li>
            <li>
              <b>Phí Ký Gửi:</b> Các khoản phí sẽ được hiển thị rõ ràng khi đăng
              ký ký gửi online. Chủ sở hữu có thể thanh toán trực tuyến.
            </li>
            <li>
              <b>Giao Dịch Mua Bán Online:</b> Các giao dịch bán cá sẽ được thực
              hiện qua nền tảng online. Sau khi bán, chủ sở hữu nhận được phần
              trăm giá trị bán hàng đã thỏa thuận.
            </li>
            <li>
              <b>Chuyển Giao Cá:</b> Khi có giao dịch thành công, [Tên Trang
              Trại/ Công Ty Koi] sẽ sắp xếp vận chuyển cá đến người mua hoặc yêu
              cầu chủ sở hữu cung cấp cá nếu họ tự giữ cá.
            </li>
          </ul>
        </section>

        <Divider />

        <section>
          <Title level={2}>3. Trách Nhiệm và Quyền Sở Hữu</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Xác Minh Quyền Sở Hữu:</b> Tất cả cá koi ký gửi cần có giấy tờ
              chứng minh quyền sở hữu hợp lệ.
            </li>
            <li>
              <b>Đảm Bảo Sức Khỏe:</b> Chủ sở hữu phải đảm bảo cá koi khỏe mạnh
              khi ký gửi và cung cấp giấy tờ kiểm tra sức khỏe nếu cần.
            </li>
            <li>
              <b>Trách Nhiệm Chăm Sóc:</b> [Tên Trang Trại/ Công Ty Koi] có
              trách nhiệm duy trì sức khỏe và điều kiện tốt nhất cho cá koi
              trong thời gian ký gửi.
            </li>
          </ul>
        </section>

        <Divider />

        <section>
          <Title level={2}>4. Quy Định Chăm Sóc</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Chế Độ Chăm Sóc và Bảo Quản:</b> Cá koi ký gửi offline sẽ được
              nuôi trong các bể sạch sẽ và được chăm sóc theo chế độ chuyên
              nghiệp.
            </li>
            <li>
              <b>Theo Dõi Sức Khỏe:</b> Đội ngũ chuyên viên sẽ thường xuyên theo
              dõi sức khỏe của cá, và thông báo ngay lập tức cho chủ sở hữu nếu
              có vấn đề phát sinh.
            </li>
            <li>
              <b>Chế Độ Ăn Uống:</b> Chế độ dinh dưỡng cho cá koi sẽ phù hợp với
              giống, kích thước, và tuổi của cá.
            </li>
          </ul>
        </section>

        <Divider />

        <section>
          <Title level={2}>5. Định Giá và Bán Cá</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Thỏa Thuận Giá Bán:</b> Giá bán cá sẽ được thỏa thuận giữa chủ
              sở hữu và [Tên Trang Trại/ Công Ty Koi], có thể điều chỉnh dựa
              trên nhu cầu và thị trường.
            </li>
            <li>
              <b>Phân Chia Doanh Thu:</b> Doanh thu từ việc bán cá sẽ được chia
              phần trăm giữa chủ sở hữu và [Tên Trang Trại/ Công Ty Koi]. Phần
              trăm cụ thể sẽ được quy định trong hợp đồng ký gửi.
            </li>
          </ul>
        </section>

        <Divider />

        <section>
          <Title level={2}>6. Điều Khoản Chấm Dứt</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Kết Thúc Ký Gửi:</b> Chủ sở hữu có thể chấm dứt hợp đồng ký gửi
              với thông báo trước [thời gian thông báo, ví dụ: 14 ngày].
            </li>
            <li>
              <b>Gia Hạn hoặc Trả Lại Cá Không Bán Được:</b> Đối với cá không
              bán được trong thời hạn ký gửi, chủ sở hữu có thể gia hạn thời
              gian ký gửi hoặc nhận lại cá.
            </li>
          </ul>
        </section>

        <Divider />

        <section>
          <Title level={2}>7. Trách Nhiệm Bảo Vệ và Bảo Hiểm</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Mất Mát và Hư Hỏng:</b> [Tên Trang Trại/ Công Ty Koi] không
              chịu trách nhiệm cho bất kỳ mất mát hoặc hư hỏng nào xảy ra do
              thiên tai, trộm cắp hoặc sự cố ngoài ý muốn.
            </li>
            <li>
              <b>Lựa Chọn Bảo Hiểm:</b> Chủ sở hữu có thể lựa chọn mua bảo hiểm
              bổ sung cho cá koi.
            </li>
          </ul>
        </section>

        <Divider />

        <section>
          <Title level={2}>8. Cam Kết</Title>
          <Paragraph>
            Bằng việc ký gửi cá koi qua hệ thống online hoặc offline của [Tên
            Trang Trại/ Công Ty Koi], bạn xác nhận đã đọc, hiểu, và đồng ý với
            các điều khoản và điều kiện trong Chính Sách này.
          </Paragraph>
        </section>
      </Typography>
    </div>
  );
};

export default Policy;
