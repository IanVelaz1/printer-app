import { LoginService } from './services/login.service';
import { AuthGuardService } from './guards/authGuard';
import { ModalService } from './services/modals/modal.service';
import { PaymentsService } from './services/payments/payments.service';
import { NoteGenerationService } from './services/noteGeneration/note-generation.service';

export const ServicesArray = [
    LoginService,
    AuthGuardService,
    ModalService,
    PaymentsService,
    NoteGenerationService
]
