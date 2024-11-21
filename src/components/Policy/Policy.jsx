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
            gửi của KoiShop để bán hoặc chăm sóc cá. Chính sách này được áp dụng
            cho cả ký gửi trực tuyến (online) trên website của KoiShop và ký gửi
            trực tiếp tại trang trại (offline). Việc sử dụng bất kỳ hình thức ký
            gửi nào đều đồng nghĩa với việc bạn đã chấp nhận các điều khoản này.
          </Paragraph>
        </section>

        <Divider />

        <section>
          <Title level={2}>2. Điều Khoản Ký Gửi</Title>

          <Title level={3}>2.1 Ký Gửi Online (Bán Trên Website của Shop)</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Mục Đích Ký Gửi:</b> Chủ sở hữu có thể ký gửi cá koi trên
              website của KoiShop để bán cho khách hàng qua nền tảng online.
            </li>
            <li>
              <b>Phí Ký Gửi:</b> Một khoản phí cố định hoặc tỷ lệ phần trăm được
              tính dựa trên chi phí của cá.
            </li>
            <li>
              <b>Quy Trình Đăng Ký Online:</b> Chủ sở hữu đăng ký ký gửi trên
              website của KoiShop và cung cấp các thông tin cần thiết về cá koi,
              bao gồm hình ảnh, thông tin giống loài, tình trạng sức khỏe, và
              giá bán mong muốn, đồng thời điền thông tin vào hợp đồng có sẵn
              trên website.
            </li>
          </ul>

          <Title level={3}>2.2 Ký Gửi Offline (Chăm Sóc tại Trang Trại)</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Phí Ký Gửi:</b> Một khoản phí cố định được tính dựa trên số
              tuần ký gửi (ký gửi tối thiểu phải 7 ngày). Phí này bao gồm chi
              phí chăm sóc và bảo trì cơ sở vật chất.
            </li>
            <li>
              <b>Thời Hạn Ký Gửi:</b>Thời gian ký gửi tiêu chuẩn là 7 ngày.
              Trong quá trình trong thời gian ký gửi, chủ sở hữu không thể chấm
              dứt hợp đồng.
            </li>
          </ul>
        </section>

        <Divider />

        <section>
          <Title level={2}>3. Trách Nhiệm và Quyền Sở Hữu</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Xác Minh Quyền Sở Hữu:</b> Tất cả cá koi ký gửi cần có giấy tờ,
              chứng chỉ chứng minh quyền sở hữu hợp lệ.
            </li>
            <li>
              <b>Đảm Bảo Sức Khỏe:</b> Chủ sở hữu phải đảm bảo cá koi khỏe mạnh
              khi ký gửi và cung cấp giấy tờ kiểm tra sức khỏe nếu cần.
            </li>
            <li>
              <b>Trách Nhiệm Chăm Sóc:</b> Koi Farm có trách nhiệm duy trì sức
              khỏe và điều kiện tốt nhất cho cá koi trong thời gian ký gửi.
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
              sở hữu và KoiShop, có thể điều chỉnh dựa trên nhu cầu và thị
              trường.
            </li>
            <li>
              <b>Phân Chia Doanh Thu:</b> Doanh thu từ việc bán cá sẽ được chia
              phần trăm giữa chủ sở hữu và KoiShop. Phần trăm cụ thể sẽ được quy
              định trong hợp đồng ký gửi.
            </li>
          </ul>
        </section>

        <Divider />

        <section>
          <Title level={2}>6. Điều Khoản Chấm Dứt</Title>
          <ul className="list-disc pl-5">
            <li>
              <b>Kết Thúc Ký Gửi:</b> Chủ sở hữu không thể chấm dứt hợp đồng ký
              gửi khi đang trong thời gian kí gửi.
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
              <b>Mất Mát và Hư Hỏng:</b> KoiShop không chịu trách nhiệm cho bất
              kỳ mất mát hoặc hư hỏng nào xảy ra do thiên tai, trộm cắp hoặc sự
              cố ngoài ý muốn.
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
            Bằng việc ký gửi cá koi qua hệ thống online hoặc offline của
            KoiShop, bạn xác nhận đã đọc, hiểu, và đồng ý với các điều khoản và
            điều kiện trong Chính Sách này.
          </Paragraph>
        </section>
      </Typography>
    </div>
  );
};

export default Policy;
