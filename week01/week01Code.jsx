import { useState } from 'react';  // useState란 함수를 react란 모듈에서 꺼낸다.
import { useNavigate } from 'react-router-dom';  // useNavigate() 를 실행하면 함수가 반환이 되는데 navigate(경로)를 실행하면 경로로 이동하게 해줌!
// 여기서 의문 navigate() 함수는 아랫줄에 있는 코드는 실행하고 이동하는가? 
// 답 : 실행은 하지만 navigate(경로) 경로안에 페이지를 찾아서 렌더링 시켜야해서 매우 짧은 시간밖에 주어지지 않음 그리고 했다 하더라도 재빨리 리렌더링 되어서 안보임
// react-router-dom은 app.jsx에서도 쓰는 함수, node.js에 라우터객체와 비슷하다.

console.log("🔧 RegisterPage 렌더링됨");

function RegisterPage() {
  const navigate = useNavigate(); 
  const[gender, setGender] = useState("남");
  const [formData, setFormData] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
    height : "",
    weight : ""
  })  // state 값들을 정의, formData와 gender를 구분한 이유는 gender는 드롭다운으로 받는 값이라 그런듯? 근데 한번에 정의하고 나중에 할당하는 방식은 안되나?
  // 답 : 그치만 명시적으로 분리해놓는게 가독성과 보기 좋아서 그럼

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value } )
  }
  // 이건 좀 놀란 할당 부분 ...js객체명, 혹은 배열명 하면 분리되어서 spreading 한다. 즉 객체는 { key : value }, .. 형식으로 표현되고, 
  // [e.target.name] : e.target.value 여기서의 []는 배열이 아니라, 동적으로 할당하기 위한 e.target에 따라 동적으로 할당하기 위한 연산자
  // 즉 [] 여기안에 값은 언제나 바뀔 수 있는 동적인 부분이야! 라고 표시한 부분, value는 key에 따라오는 부분이기 때문에, 필요없다는 모양
  // 여기서 의문 ...formData, {e.target.name : e.target.value} 이건 안되나?
  // 정답 : 안됨, 객체안에 또다른 객체가 들어가는 건 문법상 오류임 즉 스프레딩 객체는 ..formdata -> setformData({key:value, key:value ...}) 이런식인 것
  // 그럼  ...formData, e.target.name : e.target.value 이건 안되나?
  // 이것도 안됨, 자바스크립트 문법에서 동적인 key는 반드시 대괄호로 묶어줘야함 setFormData({...formData, [e.target.name] : e.target.value } ) 이것만이 정답인 것
  // 즉 key에 들어가는 애를 변수처럼 쓰고 싶으면 반드시 대괄호로 묶어줘야함 왜냐면 자바스크립트는 키가 문자열이든 변수든 구분없이 쓰기 때문에 이것이 불명확해지는 것
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("🔥 handleSubmit 실행됨");

  const dataToSend = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    height: parseFloat(formData.height),
    weight: parseFloat(formData.weight),
    gender
  };  // 여기서 formData를 한번 필터링해서, 유효성 검사나 가공을 거친 뒤에 사용자 서버단으로 보내는 모양.
    // 여기서 의문 어차피 아래에 JSON.stringify에서 모두 "" 씌워져서 나갈텐데 굳이 해야하나?
    // 굳이 안해도 되지만, json객체로 변환해서 보낼때 명시적으로 타입 맞춰서 보내야하는 검증 절차 수준임임
    // 소문자는 HTML 태그로, 대문자는 React 컴포넌트로 인식됨.
  console.log("📦 서버로 보낼 데이터:", dataToSend);

  try {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    });

    console.log("🌐 fetch 응답 객체:", res);

    const result = await res.json();  // 제이슨 객체를 다시 js 객체로 바꿔줌.

    console.log("📨 응답 받은 데이터:", result);

    if (res.ok) {
      alert("✅ 회원가입 성공!");
    } else {
      alert("❌ 실패: " + result.message);
    }
  } catch (err) {
    console.error("❗ 서버 통신 에러:", err);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>

        <input
          type="text"
          name="name"
          placeholder="이름"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="text"
          name="email"
          placeholder="이메일"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="text"
          name="height"
          placeholder="신장(cm)"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="text"
          name="weight"
          placeholder="체중(kg)"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <div className="w-full">
          <label className="block mb-1 text-sm font-medium">성별</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="남">남자</option>
            <option value="여">여자</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
