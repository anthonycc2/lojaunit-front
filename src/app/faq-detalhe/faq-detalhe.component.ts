import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Faq } from '../faq';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-faq-detalhe',
  templateUrl: './faq-detalhe.component.html',
  styleUrls: [ './faq-detalhe.component.css' ]
})
export class FaqDetalheComponent implements OnInit {
  faq: Faq;

  constructor(
    private route: ActivatedRoute,
    private faqService: FaqService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFaq();
  }

  getFaq(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.faqService.getFaq(id)
      .subscribe(faq => this.faq = faq);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.faqService.updateFaq(this.faq)
      .subscribe(() => this.goBack());
  }
}