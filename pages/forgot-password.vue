<template>
  <section class="bg-white">
    <UContainer class="py-14">
      <UCard class="max-w-[500px] mx-auto auth-shadow">
        <!-- <FeatureForgotPasswordEmail /> -->
        <!-- <FeatureForgotPasswordOtp /> -->
        <!-- <FeatureForgotPassword /> -->
        <component
          :is="forgotPasswordStep[stepActive].component"
          ref="formStepElement"
          v-bind="customProps"
          @next="handleNext(forgotPasswordStep[stepActive].key, $event)"
          @back="handleBack(forgotPasswordStep[stepActive].key)"
          @resend="handleResendOtp"
        />
      </UCard>
    </UContainer>
  </section>
</template>

<script setup>
import { FeatureForgotPasswordEmail, FormOtp, FormPassword } from "#components";

definePageMeta({
  layout: "auth",
  header: {
    class: "custom-shadow sticky top-0 z-40",
    title: "Reset Password",
  },
});
const nuxtAppp = useNuxtApp();
const router = useRouter();

const stepActive = ref(0);

const formStepElement = ref();

const session = useSession();
const { registrationForm, token, profile, tokenCookie } = storeToRefs(session);

const forgotPasswordStep = [
  {
    key: "forgot-password",
    component: FeatureForgotPasswordEmail,
  },
  {
    key: "otp",
    component: FormOtp,
  },
  {
    key: "password",
    component: FormPassword,
  },
];

const {
  execute: request,
  status: statusRequest,
  error: errorRequest,
} = useSubmit("/server/api/forgot-password/request");

const {
  execute: validateOtp,
  status: statusValidateOtp,
  error: errorValidateOtp,
} = useSubmit("/server/api/forgot-password/check-otp");
const { execute: resendOtp, status: statusResendOtp } = useSubmit(
  "/server/api/forgot-password/resend-otp",
  {
    onResponse({ response }) {
      if (response.ok) {
        formStepElement.value.startCountdown();
      }
    },
  }
);
function handleResendOtp() {
  resendOtp({
    email: registrationForm.value.email,
  });
}

const {
  execute: resetPassword,
  status: statusResetPassword,
  error: errorResetPassword,
  data: dataResetPassword,
} = useSubmit("/server/api/forgot-password/reset-password");

const { execute: getProfile, status: statusProfile } = useApi(
  "/server/api/profile",
  {
    immediate: false,
    onResponse({ response }) {
      if (response.ok) {
        profile.value = response._data.data;
        session.resetRegistrationForm();
        nuxtAppp.runWithContext(() => {
          navigateTo("/my-account/profile");
        });
      }
    },
  }
);

const customProps = computed(() => {
  switch (forgotPasswordStep[stepActive.value].key) {
    case "forgot-password":
      return {
        loading: statusRequest.value === "pending",
      };
    case "otp":
      return {
        loading: statusValidateOtp.value === "pending",
        loadingResend: statusResendOtp.value === "pending",
      };

    case "password":
      return {
        loading:
          statusResetPassword.value === "pending" ||
          statusProfile.value === "pending",
      };

    default:
      return {};
  }
});

async function handleNext(stepKey, value) {
  switch (stepKey) {
    case "forgot-password":
      await request({
        email: value.email,
      });
      if (errorRequest.value) {
        formStepElement.value.setError(
          errorRequest.value.data?.meta?.validations || {}
        );
        return;
      }
      if (statusRequest.value === "success") {
        registrationForm.value.email = value.email;
        stepActive.value++;
      }
      break;

    case "otp":
      await validateOtp({
        email: registrationForm.value.email,
        otp: value.otp,
      });
      if (errorValidateOtp.value) {
        formStepElement.value.setError(
          errorValidateOtp.value.data?.meta?.validations?.otp?.[0]
        );
        return;
      }
      if (statusValidateOtp.value === "success") {
        registrationForm.value.otp = value.otp;
        stepActive.value++;
      }
      break;

    case "password":
      await resetPassword({
        email: registrationForm.value.email,
        otp: registrationForm.value.otp,
        password: value.password,
        password_confirmation: value.password,
      });

      if (errorResetPassword.value) {
        formStepElement.value.setError(
          error.value.data?.meta?.validations || {}
        );
        return;
      }

      if (statusResetPassword.value === "success") {
        registrationForm.value.password = value.password;
        registrationForm.value.password_confirmation = value.password;

        token.value = dataResetPassword.value.data?.token;
        tokenCookie.value = dataResetPassword.value.data?.token;

        getProfile();
      }
      break;

    default:
      stepActive.value++;
      break;
  }
}

function handleBack(stepKey) {
  if (stepKey === "forgot-password") {
    return router.push("/login");
  }
  stepActive.value--;
}
</script>

<style scopde>
.auth-shadow {
  box-shadow: 0px 3px 10px 0px #00000024;
}
</style>
