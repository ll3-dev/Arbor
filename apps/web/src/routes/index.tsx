import supabase from "@/src/apis/supabase/index.ts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      throw redirect({
        to: "/app",
      });
    }
  },
});

function Index() {
  async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/app`,
      },
    });
    console.log("Kakao sign-in data:", data);
    if (error) {
      console.error("Error during Kakao sign-in:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-[4_0_0] bg-gradient-to-br from-gray-600 to-gray-800"></div>
      <div className="flex-[1_0_320px] justify-center items-center flex flex-col p-4">
        <h3 className="text-2xl font-semibold my-2">환영합니다!</h3>
        <p className="text-gray-600 text-sm mb-16 whitespace-pre text-center">
          {"Arbor는 AI와 함께하는\n새로운 경험을 제공합니다."}
        </p>
        <button
          className="bg-[#FEE500] text-[#000000]/85 p-2 px-3 rounded-[12px]"
          onClick={signInWithKakao}
        >
          <img
            src="/kakao_login_icon.png"
            alt="Kakao Login"
            className="inline-block mr-2 w-[20px] h-[20px]"
          />
          카카오 로그인
        </button>
      </div>
    </div>
  );
}
