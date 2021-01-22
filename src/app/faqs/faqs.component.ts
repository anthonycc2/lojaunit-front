import { Component, OnInit, Input } from '@angular/core';
import { Faq } from '../faq';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  faq: Faq;
  faqs: Faq[];

  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.faq = {
      id: 0,
      datahora: '',
      texto: '',
      produto: {
        id: 0,
        nome: '',
        descricao: '',
        preco: 0,
        unidade: '',
        categoria: null,
        fornecedor: null,
        marca: null
      }
    };
    this.getFaqs();
  }

  getFaqs() {
    this.faqService.getFaqs()
        .subscribe(faqs => this.faqs = faqs);
  }

  add(): void {
    this.faqService.addFaq(this.faq)
    .subscribe(faq => {
      this.getFaqs();
    });  
    /*document.getElementById('nomeFaq').textContent = '';
    document.getElementById('descricaoFaq').textContent = '';*/
  }

  delete(faq: Faq): void {
    this.faqs = this.faqs.filter(h => h !== faq);
    this.faqService.deleteFaq(faq).subscribe();
  }

}