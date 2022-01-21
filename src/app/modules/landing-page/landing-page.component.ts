import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostType } from '@enums';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { CoffeeLabService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
    readonly PostType = PostType;
    posts = [];
    responsiveOptions = [];
    trendingData = [];
    isLoading: boolean;
    shareData = [
        {
            heading: 'Create an account on Era of We',
            disp: 'You can contribute as an estate, roaster, barista, or coffee consumer',
            image: 'assets/images/group-29.svg',
        },
        {
            heading: 'Write in a language of your choosing',
            disp: 'We aim to be as inclusive as we can, so you can write in over 10 languages',
            image: 'assets/images/noun-languages-2711986.svg',
        },
        {
            heading: 'Tell your story- as a brand or coffee lover',
            disp:
                'Brands can promote their vision and share knowledge while consumers share their views and discover new brands.',
            image: 'assets/images/shape-2.svg',
        },
    ];
    hereData = [
        {
            name: 'Yker Valerio',
            position: 'Bon Vivant Caffè',
            disp:
                "“The world of coffee is full of generous and forward-thinking individuals and organizations. Since I started learning about specialty coffee, I have met incredible people, and The Coffee Lab is a space that's great to meet coffee connoisseurs and enthusiasts.Sharing insights through The Coffee Lab is a wonderful exercise to keep up-to-date. Checking questions, reading articles, and writing for like-minded people has been enriching and exciting. I definitely enjoy participating in The Coffee Lab.”",
            image: 'assets/images/yker-valerio.png',
        },
        {
            name: 'Vasileia Fanaroti',
            position: 'The Wandering Bean',
            disp:
                '"The Coffee Lab is a brilliant platform for both coffee enthusiasts and professionals to share knowledge, learn from each other and stay in touch. It has many coffee recipes and articles, from how-to tutorials to anything related to the coffee value-chain. The Q&A section is my favorite place to ask questions, share thoughts or get advice from others within the community!"',
            image: 'assets/images/vasileia-fanaroti.png',
        },
        {
            name: 'Susan Rov',
            position: 'Bon Vivant Caffè',
            disp:
                '“The Era of We is a great place to connect with other coffee lovers within the community as well as my go-to resource for coffee recipes and educational articles. It’s so valuable to exchange information on a global scale and engage in discussions with coffee enthusiasts from the other side of the world!”',
            image: 'assets/images/susan-rov.jpeg',
        },
    ];
    platform = [
        {
            arrow: 'assets/images/arrow-down-circle-2.svg',
            heading: 'Coffee Bussinesses',
            disp:
                'Share your brand story directly with our audience. This platform gives you the space to build trust in your brand by sharing your expertise with consumers.',
        },
        {
            arrow: 'assets/images/arrow-down-circle-2.svg',
            heading: 'Consumers',
            disp:
                'Write about your coffee experiences, share your own articles and recipes, pose questions to experts and other consumers. It enables you to meet other coffee lovers from around the world',
        },
        {
            arrow: 'assets/images/arrow-down-circle.svg',
            heading: 'Proofreaders',
            disp:
                'Help make coffee more inclusive by translating and proofreading in 9 languages, with more languages being added soon.',
        },
    ];
    menuItems = [
        {
            label: 'Q & A forum',
            postType: PostType.QA,
        },
        {
            label: 'Posts',
            postType: PostType.ARTICLE,
        },
        {
            label: 'Brewing guides',
            postType: PostType.RECIPE,
        },
    ];

    constructor(
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
    ) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3,
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2,
            },
            {
                breakpoint: '560px',
                numVisible: 1.25,
                numScroll: 1,
            },
        ];
    }

    ngOnInit(): void {
        this.getPosts(0);
        this.getTrendingData();
    }

    handleChange(event) {
        this.getPosts(event.index);
    }

    getPosts(index): void {
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            page: 1,
            per_page: index === 0 ? 6 : 3,
        };
        this.isLoading = true;
        this.coffeeLabService
            .getForumList(index === 0 ? PostType.QA : index === 1 ? PostType.ARTICLE : PostType.RECIPE, params)
            .subscribe((res) => {
                if (res.success && res.result) {
                    this.posts = index === 0 ? res.result?.questions : res.result;
                } else {
                    this.posts = [];
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            });
    }

    getTrendingData() {
        this.coffeeLabService.getTrendingPosts().subscribe((res) => {
            if (res.success) {
                this.trendingData = [res.result.articles[0], res.result.recipes[0], res.result.articles[1]];
            }
        });
    }

    getLink(item: any, type: string) {
        return `/en/${type}/${item.slug}`;
    }

    showSignUp() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
