"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import Nav from "@/components/Nav";
import { routes } from "@/routes";
import { classNames } from "@/utils";

interface StatusItemProps {
  isActive: boolean;
  isLast: boolean;
  text: string;
}

const StatusItem: React.FC<StatusItemProps> = ({
  isActive,
  isLast,
  text
}) => {
  return (
    <div className="flex flex-row">
      <span className={classNames(
        !isLast ? "mr-5" : "",
        isActive ? "text-black" : "text-gray-400"
      )}>{text}</span>
      {
        !isLast && (
          <span className="mr-5 text-gray-500 text-sm">{ ">" }</span>
        )
      }
    </div>
  )
}

const StepNavbar = () => {
  const searchParams = useSearchParams();
  const step = useMemo(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) { return Number(stepParam) }
    else return 1;
  }, [searchParams]);

  return (
    <Nav
      className="flex flex-row"
      linkMenus={[
        {
          path: `${routes.register.path}?step=1`,
          item: (
            <StatusItem
              isActive={step === 1}
              isLast={ false }
              text="Step1. 약관동의"
            />
          )
        },
        {
          path: `${routes.register.path}?step=2`,
          item: (
            <StatusItem
              isActive={step === 2}
              isLast={ false }
              text="Step2. 정보입력"
            />
          )
        },
        {
          path: `${routes.register.path}?step=3`,
          item: (
            <StatusItem
              isActive={step === 3}
              isLast={ true }
              text="Step3. 가입완료"
            />
          )
        }
      ]}
    />
  );
}

const RegisterContainer = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <h1 className="text-lg py-5">회원가입</h1>
      <StepNavbar/>
      { children }
    </>
  );
}

export default RegisterContainer;
