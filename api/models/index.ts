import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @BeforeInsert()
    createDate() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    updateDate() {
        this.updatedAt = new Date();
    }

}

@Entity({
    name: "platform"
})
export class Platform extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(_ => Offer, offer => offer.platform)
    offers: Array<Offer>;

    @OneToMany(_ => CronTask, cronTask => cronTask.platform)
    tasks: Array<CronTask>;

}

@Entity({
    name: "offer"
})
export class Offer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    link: string;

    @Column()
    targetId: string;

    @JoinColumn({
        name: "platformId",
        referencedColumnName: "id"
    })
    @ManyToOne(_ => Platform, platform => platform.offers)
    platform: Platform;

}

@Entity({
    name: "user"
})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pseudo: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(_ => CronTask, task => task.user)
    tasks: Array<CronTask>;

}

@Entity({
    name: "cron_task"
})
export class CronTask extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn({
        name: "platformId",
        referencedColumnName: "id"
    })
    @ManyToOne(_ => Platform, platform => platform.tasks)
    platform: Platform;

    @JoinColumn({
        name: "userId",
        referencedColumnName: "id"
    })
    @ManyToOne(_ => User, user => user.tasks)
    user: User;

    @OneToMany(_ => CronTaskKeywords, cronTaskKeywords => cronTaskKeywords.cronTask)
    cronTaskKeywods: Array<CronTaskKeywords>;

}

@Entity({
    name: "cron_task_keywords"
})
export class CronTaskKeywords {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn({
        name: "cronTaskId",
        referencedColumnName: "id"
    })
    @ManyToOne(_ => CronTask, cronTask => cronTask.cronTaskKeywods)
    cronTask: CronTask;

    @Column()
    keyword: string;

}