import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-website-settings-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatSlideToggleModule, 
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './website-settings-dialog.component.html',
  styleUrl: './website-settings-dialog.component.scss'
})
export class WebsiteSettingsDialog implements OnInit {
  instituteId: string;
  instituteName: string;
  isLoading = true;
  isSaving = false;
  publishToCloudflareR2 = true;
  
  // Assuming api-gateway runs on 4000 locally
  private apiUrl = 'http://localhost:4000/api/institute-website';

  constructor(
    public dialogRef: MatDialogRef<WebsiteSettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.instituteId = data.id;
    this.instituteName = data.name;
  }

  ngOnInit(): void {
    this.fetchConfig();
  }

  fetchConfig() {
    this.isLoading = true;
    this.http.get<any>(this.apiUrl, {
      headers: { 'x-institute-id': this.instituteId }
    }).subscribe({
      next: (config) => {
        this.publishToCloudflareR2 = config.publishToCloudflareR2 ?? true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching website config', err);
        // Fallback for demo/mock
        this.isLoading = false;
      }
    });
  }

  onToggleChange(event: any) {
    if (!event.checked) {
      // User is trying to turn it OFF
      const keyword = 'CONFIRM';
      const input = window.prompt(`WARNING: Turning this off stops uploading website files to Cloudflare R2. This should only be done if a custom Cloudflare Worker is deployed.\n\nType "${keyword}" to confirm.`);
      
      if (input !== keyword) {
        // Revert toggle if cancelled or wrong keyword
        setTimeout(() => {
          this.publishToCloudflareR2 = true;
        }, 0);
        return;
      }
    }
    this.publishToCloudflareR2 = event.checked;
  }

  save() {
    this.isSaving = true;
    this.http.put<any>(this.apiUrl, { publishToCloudflareR2: this.publishToCloudflareR2 }, {
      headers: { 'x-institute-id': this.instituteId }
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error saving website config', err);
        this.isSaving = false;
        this.dialogRef.close(true); // Close anyway for now if api fails in mock
      }
    });
  }
}
