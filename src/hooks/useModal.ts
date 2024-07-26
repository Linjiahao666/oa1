import Modal from '@/components/modal/baseModal.ts'
class UserInfoModal extends Modal {
  private static instance: UserInfoModal;

  constructor(component: any) {
    super(component);
  }

  static getInstance(component: any) {
    if (!UserInfoModal.instance) {
      UserInfoModal.instance = new UserInfoModal(component);
    }
    return UserInfoModal.instance;
  }
}

export default function useModal(component: any) {
  return {
    modal: UserInfoModal.getInstance(component)
  }
}