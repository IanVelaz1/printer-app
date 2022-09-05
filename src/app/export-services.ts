import { LoginService } from './services/login.service';
import { AuthGuardService } from './guards/authGuard';
import { ModalService } from './services/modals/modal.service';
import { PaymentsService } from './services/payments/payments.service';
import { NoteGenerationService } from './services/noteGeneration/note-generation.service';
import { ClientsService } from './services/clients/clients.service';
import { ReportsService } from './services/reports/reports.service';

export const ServicesArray = [
    LoginService,
    AuthGuardService,
    ModalService,
    PaymentsService,
    NoteGenerationService,
    ClientsService,
    ReportsService
]
