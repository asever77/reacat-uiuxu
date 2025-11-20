"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  setPolicies,
  selectPolicy,
  setLoading,
  setError,
  clearError,
} from "@/stores/slices/insuranceSlice";

import { Typo } from "@/components/contents";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
} from "@/components/uiux";

interface Policy {
  id: string;
  name: string;
  premium: number;
  coverage: number;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "보험명은 필수입니다." }),
  premium: z.coerce
    .number()
    .min(0, { message: "보험료는 0 이상이어야 합니다." }),
  coverage: z.coerce
    .number()
    .min(0, { message: "보장금액은 0 이상이어야 합니다." }),
});

export default function PolicyForm() {
  const dispatch = useAppDispatch();
  const { loading, error, selectedPolicy, policies } = useAppSelector(
    (state) => state.insurance
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      premium: 0,
      coverage: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      // 새로운 정책 생성
      const newPolicy: Policy = {
        id: window.Date.now().toString(),
        name: values.name,
        premium: values.premium,
        coverage: values.coverage,
      };

      // 시뮬레이션된 API 호출 (실제로는 서버에 저장)
      setTimeout(() => {
        const updatedPolicies = [...policies, newPolicy];
        dispatch(setPolicies(updatedPolicies));
        dispatch(selectPolicy(newPolicy));

        // 폼 리셋
        form.reset();
      }, 1000);
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."
        )
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <Typo tag="h2" style="heading-l">
        보험 정책 추가
      </Typo>
      <Typo tag="p" style="body-m">
        새 보험 정책 추가
      </Typo>

      {error && (
        <Typo tag="em" style="body-s">
          {error}
        </Typo>
      )}

      {selectedPolicy && (
        <Typo tag="em" style="body-s">
          선택된 정책: {selectedPolicy.name}
        </Typo>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>보험명</FormLabel>
                <FormControl>
                  <Input placeholder="보험명을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="premium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>보험료 (원)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="월 보험료를 입력하세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>보장금액 (원)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="보장금액을 입력하세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "추가 중..." : "보험 정책 추가"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
